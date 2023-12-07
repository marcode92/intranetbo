var express = require('express');
var sql = require('msnodesqlv8');
/* var err_mess = require('ERR_MESS')*/
var config = "Server=VMINTRANET\\SQLEXPRESS2008;Database=newintranet;Trusted_Connection=No;UID=sa;PWD=Pippo123.;Driver={ODBC Driver 11 for SQL Server}"

var app = express();

var ldap = require('ldapjs');
var axios = require('axios')
var bodyParser = require('body-parser')
var index = 0

const nodemailer = require("nodemailer");
const html = `<div>hello </div>`;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/login', (req, res) => {

    // console.log('req.body.username', req.body['username']);
    const client = ldap.createClient({
        url: 'ldap://bo.dipvvf.it:3268'
    });

    const usernameLogin = `${req.body.username}@bo.dipvvf.it`

    client.bind(usernameLogin, req.body.password, (err) => {
        if (err) {
            console.log('ERROR new connection' + err);
            res.json("CRED_ERR")
        } else {
            let nameDisplayed = "";
            login_res =
                client.search("OU=Sede,dc=bo,dc=dipvvf,dc=it", { filter: `(&(objectCategory=user)(userPrincipalName=${usernameLogin}))`, scope: "sub" },
                    (_,x) => {
                      x.on('searchEntry', (entry) => {
                            const entireOBJ = entry.attributes

                            entireOBJ.forEach(attribute => {
                                console.log(`${attribute.type}: ${attribute.values.join(', ')}`);

                                if (attribute.type === "displayName") {
                                    nameDisplayed = attribute.values
                                }
                            });
                        })
                        x.on('end', () => {
                            console.log("namedisplayed", nameDisplayed);
                        });
                    }
                );
        }


        if (login_res === '') {
            console.log("credenziali errate")
        } else {
            const query = "SELECT users from iusers where users=`${req.body.username}`"
            sql.open(config, (err, conn) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                conn.query(query, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    console.log(rows);
                    res.json(rows);
                    conn.close();
                });
            })
        }
        /*`INSERT INTO dbo.iusers(users,area)VALUES('luca','TEP')`*/

    });
  });

app.post('/sendemail', (req, res) => {
    async function main() {

        const transporter = nodemailer.createTransport({
            host: 'smtp-s.vigilfuoco.it',
            port: '465',
            secure: true,
            auth: {
                user: 'marco.demata@vigilfuoco.it',
                pass: 'Stoppato9!'
            }
        })

        const info = await transporter.sendMail({
            from: '"marco demata" <marco.demata@vigilfuoco.it>', // sender address
            to: "marco.demata@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html, // html body
        });

        console.log("sent" + info.messageId);
    }

    main().catch(console.error);
})

function logCallback(err, res) {
    if (!res) {
        console.log(err)
        return
    }

    res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
    });
    res.on('searchEntry', (entry) => {
        const ldapEntry = entry.attributes;

        ldapEntry.forEach(attribute => {
            console.log(`${attribute.type}: ${attribute.values.join(', ')}`);

            if (attribute.type === "displayName") {
                return attribute.values
            }
        });
    });
    res.on('searchReference', (referral) => {
        console.log('referral: ' + referral.uris.join());
    });
    res.on('error', (err) => {
        console.error('error: ' + err.message);
    });
    res.on('end', (result) => {
        console.log('status: ' + result?.status);
    });
}

app.listen(3000, function () {
    console.log("server started");
})
