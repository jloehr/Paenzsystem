var express = require('express');
var router = express.Router();
var Citizen = require('../models/citizen.js');

router.route('/')
	.get(function(req, res) {

		Citizen.find({},'CitizenID FirstName LastName', function(err, Citizens) {

            if (err)
                res.send(err);

            res.json(Citizens);
        });
	})
	.post(function(req, res) {
		Citizen.create(req.body, function(err, NewCitizen) {
			if (err)
				res.send(err);

			res.json(NewCitizen);
		});	
	});
	/*
	.delete(function(req,res) {
		Citizen.collection.drop();
		res.send('Done');
	});
	*/

router.route('/:citizen_id')
	.get(function(req, res) {

		Citizen.find({ CitizenID : req.params.citizen_id }, function(err, Citizen) {
            if (err)
                res.send(err);

            res.json(Citizen);
        });
	})
	.put(function(req, res) {

		Citizen.findOneAndUpdate({ CitizenID : req.params.citizen_id }, req.body, { new: true }, function(err, Citizen) {
            if (err)
                res.send(err);

            res.json(Citizen);
        });
	})

module.exports = { 
	path: '/citizens',
	router: router 
};