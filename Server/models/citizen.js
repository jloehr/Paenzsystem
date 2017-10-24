var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var Counter = require('./counter.js');

const ModelID = 'Citizen';

var CitizenSchema = new Schema({
	CitizenID: Number,
    FirstName: String,
    LastName: String,
    Birthdate: Date,
    Parent: {
    	FirstName: String,
    	LastName: String,
    	Phone: String,
    	Email: String
    },
    Annotation: String,
});

CitizenSchema.pre('save', function(next) {
    var NewCitizen = this;
    Counter.findByIdAndUpdate({_id: ModelID}, {$inc: { Counter: 1} }, {new: true, upsert: true}, function(err, Counter) {
        NewCitizen.CitizenID = Counter.Counter;
        next();
    });
});

module.exports = mongoose.model(ModelID, CitizenSchema);