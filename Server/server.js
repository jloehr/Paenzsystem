var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var api = express.Router();
var https = require('./services/https.js');
var http = require('./services/http.js');
var config = require('./config/config.js');

var citizens = require('./routes/citizens.js');
var bank_accounts = require('./routes/bank_accounts.js');

console.log('Node is running in ' + (config.production ? 'production' : 'development') + ' mode!');
console.log('Node data directory: ' + config.datadir);

// Create Database Connection
const url = `mongodb://${config.db_host}:27017/paenzsystem`;
mongoose.connect(url, { useMongoClient: true });

// Enable Middleware for JSON parsing
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Endpoints
app.use(express.static('public'));	
app.use('/api', api);

// Set up API Endpoints
api.use(citizens.path, citizens.router);
api.use(bank_accounts.path, bank_accounts.router);

// Start listening
http.start();
https.start(app, config);
