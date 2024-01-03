var express = require('express');
var jwt = require('jsonwebtoken')
var sql = require('msnodesqlv8');
var app = express();

var config = "Server=VMINTRANET\\SQLEXPRESS2008;Database=newintranet;Trusted_Connection=No;UID=sa;PWD=Pippo123.;Driver={ODBC Driver 11 for SQL Server}"
const secretKey = "test_secret"
const options = {
    expiresIn: '1h', // Tempo di validità del token (ad esempio, 1 ora)
};
var ldap = require('ldapjs');
var axios = require('axios')
var bodyParser = require('body-parser')
var index = 0
/* 
const nodemailer = require("nodemailer");
const html = `<div>hello </div>`; */

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

    const usernameLogin = `${req.body.userID}@bo.dipvvf.it`

    client.bind(usernameLogin, req.body.password, (err) => {
        if (err) {
            console.log('ERROR new connection' + err);
            const payload = {
                userID: '',
                userRole: '',
            }
            res.json(jwt.sign(payload, secretKey, options))

        } else {
            let nameDisplayed = "";
            login_res =
                client.search("OU=Sede,dc=bo,dc=dipvvf,dc=it", { filter: `(&(objectCategory=user)(userPrincipalName=${usernameLogin}))`, scope: "sub" },
                    (_, x) => {
                        x.on('searchEntry', (entry) => {
                            const entireOBJ = entry.attributes

                            entireOBJ.forEach(attribute => {
                                if (attribute.type === "displayName") {
                                    nameDisplayed = attribute.values
                                }
                            });
                            res.emit('end')
                        })
                        x.on('end', () => {

                            var op = `SELECT userID,userRole from login where userID='${nameDisplayed}'`
                            sql.open(config, (err, conn) => {
                                if (err) {
                                    return;
                                }

                                conn.query(op, (err, rows) => {
                                    if (err) {
                                        console.error("error", err.message);
                                        return;
                                    }
                                    const payload = {
                                        //namedisplayed qui serve quando torni senza role a distinguerlo da login fallito campi vuoti
                                        userID: nameDisplayed,
                                        userRole: rows.length ? rows[0].userRole : '',
                                    }
                                    res.json(jwt.sign(payload, secretKey, options))
                                    conn.close();
                                });
                                console.log("select ")
                            })
                        });

                    }
                );
        }
    });
});

app.post('/register', (req, res) => {
    var op = `INSERT INTO login(userID,userRole)VALUES('${req.body.userID}','${req.body.userRole}')`
    sql.open(config, (err, conn) => {
        if (err) {
            console.error(err.message);
            return;
        }

        conn.query(op, (err, rows) => {
            if (err) {
                return;
            }
            const payload = {
                userID: req.body.userID,
                userRole: req.body.userRole,
            }
            res.json(jwt.sign(payload, secretKey, options))
            conn.close();
        });
    })
})
/* FUTURE DEVELOPING
app.post('/verifyToken', (token,res) =>{
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // Il token è invalido o scaduto
          console.error('Errore nella verifica del token:', err);
        } else {
          // Il token è valido, puoi accedere ai dati decodificati
          console.log('Token verificato, dati decodificati:', decoded);
        }
      });
}) */

/* app.post('/sendemail', (req, res) => {
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
}) */

/* function logCallback(err, res) {
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
} */

app.listen(3000, function () {
    console.log("server started");
})
