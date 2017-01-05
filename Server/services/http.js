// HTTP (80) redirect to HTTPS (443)
var express = require('express');
var http = require('http');
var redirect = express();

function start() {
	http.createServer(redirect).listen(8080, function () {
	  console.log('Redirect to HTTPS on port 8080!')
	});

	redirect.all('*',function(req,res){  
	    res.redirect(301, "https://" + req.headers.host + req.url);
	});
}

module.exports = { start };
