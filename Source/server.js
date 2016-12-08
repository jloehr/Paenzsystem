var express = require('express');
var app = express();

var https = require('./services/https.js');
var http = require('./services/http.js');
var db = require('./services/mongodb.js');

const production = (process.env.NODE_ENV == 'production');
console.log('Node is running in ' + (production ? 'production' : 'development') + ' mode!');

const datadir = production ? process.env.npm_package_config_production_datadir : process.env.npm_package_config_devel_datadir
console.log('Node data directory: ' + datadir);

function startServer(db)
{
	http.start();
	https.start(app, datadir);

	app.use(express.static('public'));
}

db.connect(startServer);

