var express = require('express')
var app = express()
const production = (process.env.NODE_ENV == 'production');
console.log('Node is running in ' + (production ? 'production' : 'development') + ' mode!');

const datadir = production ? process.env.npm_package_config_production_datadir : process.env.npm_package_config_devel_datadir
console.log('Node data directory: ' + datadir);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
