var express = require('express');
var app = express();

var https = require('./services/https.js');
var http = require('./services/http.js');
var bodyParser = require('body-parser');
var db = require('./services/mongodb.js');
var config = require('./config/config.js');

console.log('Node is running in ' + (config.production ? 'production' : 'development') + ' mode!');
console.log('Node data directory: ' + config.datadir);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

function startServer(db)
{
	http.start();
	https.start(app, config);

	app.use(express.static('public'));
}

db.connect(startServer, config);
