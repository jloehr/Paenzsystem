var https = require('https');
var fs = require('fs');

function start(app, config) {
	const options = {
		key: fs.readFileSync(config.datadir + config.ssl_key_name),
		cert: fs.readFileSync(config.datadir + config.ssl_cert_name)
	};

	https.createServer(options, app).listen(8443, function () {
		console.log('Example app listening on port 8443!')
	});
};

module.exports = { start };
