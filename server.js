const express = require('express')
const server = express()
require('dotenv').config()
const https = require('https')
const fs = require('fs')
const Email = require('./mongoose/Emails')
const mongoose = require('mongoose')
server.use(express.static(__dirname));
server.use(express.static("public"));
server.use(express.json())

// DB connection
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  // don't show the log when it is test
  if (process.env.NODE_ENV !== 'test') {
    console.log('Connected to MongoDB instance')
    console.log('App is running ...')
  }
})
    .catch(err => {
      console.error('App starting error:', err.message)
      process.exit(1)
    })
mongoose.Promise = global.Promise


const port = 80;
server.listen(port, function() {
    console.log('server listening on port ' + port)
})
// https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'alexiscool'
// }, server).listen(port, () => {
//     console.log('Listening on port ' + port)
// });

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.post('/subscribe', (req, res) => {
    let email = new Email({
        email: req.body.email
    })

    Email.findOne({email: req.body.email}).then(async (email) => {
        if(email !== null) {
            console.log('Email exists already!')
        }
    })

    email.save((err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log('email added to db');
        res.sendStatus(200);
    });
});

