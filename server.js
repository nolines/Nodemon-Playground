// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const db = require('./config/db');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    dba = database.db("note-api")

    require('./app/routes')(app, dba);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

// MongoClient.connect('mongodb://127.0.0.1:27017/playground', (err, db) => {
//     if (err) {
//         return console.log("HATA!" + err);
//     }

//     // Do something with db here, like inserting a record
//     db.collection('notes').insertOne(
//         {
//             title: 'Hello MongoDB',
//             text: 'Hopefully this works!'
//         },
//         function (err, res) {
//             if (err) {
//                 db.close();
//                 return console.log(err);
//             }
//             // Success
//             db.close();
//         }
//     )
// });

// app.listen(port, () => {
//     console.log('Listening on ' + port);
// });