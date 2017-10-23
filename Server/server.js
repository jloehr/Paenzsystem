var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var https = require('./services/https.js');
var http = require('./services/http.js');
var config = require('./config/config.js');

var citizens = require('./routes/citizens.js');

console.log('Node is running in ' + (config.production ? 'production' : 'development') + ' mode!');
console.log('Node data directory: ' + config.datadir);

const url = `mongodb://${config.db_host}:27017/paenzsystem`;
mongoose.connect(url, { useMongoClient: true });

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));	
app.use(citizens.path, citizens.router);

http.start();
https.start(app, config);
