var express = require('express');
var app = express();

var ldap = require('ldapjs');
var axios = require('axios')
var bodyParser = require('body-parser')
var index = 0
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    /*     // Request methods you wish to allow
        
        // Request headers you wish to allow
        
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        */
    // Pass to next layer of middleware
    next();
});

app.post('/login', (req, res, next) => {
    items = [];
    pap = ''
    // console.log('req.body.username', req.body['username']);
    const client = ldap.createClient({
        url: 'ldap://bo.dipvvf.it:3268'
    });
    dates = ''

    client.bind(req.body.username, req.body.password, (err) => {
        if (err) {
            console.log('ERROR new connection' + err);
        } else {
         new Promise((resolve, reject) => {
                items = {};

                client.search(
                    "OU=Sede,dc=bo,dc=dipvvf,dc=it",
                    { filter: `(&(objectCategory=user)(userPrincipalName=${req.body.username}))`, scope: "sub" },
                    function (err, res) {

                        if (!res) {
                            console.log(err)
                            return
                        }

                        /* res.on('searchRequest', (searchRequest) => {
                        }); */
                        res.on('searchEntry', (entry) => {
                           items = {
                                nome: entry.attributes.filter(x => x.type === 'givenName' )[0].values[0].toString(),
                                cognome: entry.attributes.filter(x => x.type === 'sn' )[0].values[0].toString(),                                
                            }                            
                            console.log('entry: ', items);
                        });
                       /*  res.on('searchReference', (referral) => {
                        });
                        res.on('error', (err) => {
                        }); */
                        res.on('end', (x) => {
                            resolve(items);
                        });
                    })
            }).then(x => res.send(x))
        }
    })
})


app.listen(3000, function () {
    console.log("server started");
})
