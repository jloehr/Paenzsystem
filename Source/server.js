var express = require('express')
var https = require('https');
var fs = require('fs');
var app = express();

const production = (process.env.NODE_ENV == 'production');
console.log('Node is running in ' + (production ? 'production' : 'development') + ' mode!');

const datadir = production ? process.env.npm_package_config_production_datadir : process.env.npm_package_config_devel_datadir
console.log('Node data directory: ' + datadir);

const options = {
  key: fs.readFileSync(datadir+process.env.npm_package_config_ssl_key_name),
  cert: fs.readFileSync(datadir+process.env.npm_package_config_ssl_cert_name)
};

https.createServer(options, app).listen(8443, function () {
  console.log('Example app listening on port 8443!')
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// HTTP (80) redirect to HTTPS (443)
var http = require('http');
var redirect = express();

http.createServer(redirect).listen(8080, function () {
  console.log('Redirect to HTTPS on port 8080!')
});

redirect.all('*',function(req,res){  
    res.redirect(301, "https://" + req.headers.host + req.url);
});
