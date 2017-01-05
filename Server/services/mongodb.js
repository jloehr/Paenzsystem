var MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/paenzsystem';

function connect(next) {
	MongoClient.connect(url, function(error, db) {
		if (error) throw error;

		console.log("Conected to MongoDB.");

		next(db);
	});
}

module.exports = { connect };
