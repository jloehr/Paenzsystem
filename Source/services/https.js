var https = require('https');
var fs = require('fs');

function start(app, datadir) {
	const options = {
		key: fs.readFileSync(datadir+process.env.npm_package_config_ssl_key_name),
		cert: fs.readFileSync(datadir+process.env.npm_package_config_ssl_cert_name)
	};

	https.createServer(options, app).listen(8443, function () {
		console.log('Example app listening on port 8443!')
	});
};

module.exports = { start };
