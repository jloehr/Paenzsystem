var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var Counter = require('./counter.js');

const ModelID = 'Citizen';

var CitizenSchema = new Schema({
	CitizenID: { type: Number, index: true, unique: true},
    FirstName: String,
    LastName: String,
    Birthdate: Date,
    ParentFirstName: String,
    ParentLastName: String,
    Phone: String,
    Email: String,
    Annotation: String,
    CheckIns: [Date],
    CheckOuts: [Date],
    Balance: { type: Number, select: false, default: 0 },
    Transactions : { type:[Number], select: false }
});

CitizenSchema.pre('save', function(next) {
    var NewCitizen = this;
    Counter.findByIdAndUpdate({ _id: ModelID }, { $inc: { Counter: 1 } }, { new: true, upsert: true }, function(err, Counter) {
        NewCitizen.CitizenID = Counter.Counter;
        next();
    });
});

module.exports = mongoose.model(ModelID, CitizenSchema);