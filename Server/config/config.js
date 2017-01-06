const production = (process.env.NODE_ENV == 'production');

var config = module.exports = require((production ? './production.js' : './development.js'));

config.production = production;
config.ssl_key_name = process.env.npm_package_config_ssl_key_name;
config.ssl_cert_name = process.env.npm_package_config_ssl_cert_name;
