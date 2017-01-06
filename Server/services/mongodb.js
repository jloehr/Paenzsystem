var MongoClient = require('mongodb').MongoClient

function connect(next, config) {
	const url = `mongodb://${config.db_host}:27017/paenzsystem`;

	MongoClient.connect(url, function(error, db) {
		if (error) throw error;

		console.log("Conected to MongoDB.");

		next(db);
	});
}

module.exports = { connect };
