var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var CounterSchema = new Schema({
      _id: { type: String, required: true },
      Counter: { type: Number, default: 170000 }
}); 

module.exports = mongoose.model('Counter', CounterSchema);