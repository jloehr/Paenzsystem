var express = require('express');
var router = express.Router();
var Citizen = require('../models/citizen.js');


router.route('/:citizen_id')
	.get(function(req, res) {

		Citizen.find({ CitizenID : req.params.citizen_id }, 'Balance Transactions', function(err, Citizen) {
            if (err)
                res.send(err);

            res.json(Citizen);
        });
	})
	.patch(function(req, res) {
		var Amount = req.body.Amount;

		Citizen.find({ CitizenID : req.params.citizen_id }, 'Balance', function(err, Result) {
            if (err)
                res.send(err);

            var Account = Result[0];

            if((Account.Balance + Amount) < 0)
            	res.json({Error: 'Insufficent funds'});
            else
				Citizen.findOneAndUpdate({ CitizenID : req.params.citizen_id }, { $set: { Balance : Account.Balance + Amount }, $push: { Transactions: Amount }}, { new: true, fields: 'Balance Transactions' }, function(err, Citizen) {
            	if (err)
                	res.send(err);

            	res.json(Citizen);
        	});
        });
	})


module.exports = { 
	path: '/bank_accounts',
	router: router 
};