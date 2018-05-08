// server.js
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

var routes = require('./app/routes/index');

const db = require('./config/db');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db.url, function (err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + db.url);
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', routes);

var server = http.createServer(app);
server.listen(port, function () {
    console.log("Node server running on http://localhost:" + port);
});

module.exports = app;