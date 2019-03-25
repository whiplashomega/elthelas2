var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var stronghold = new Schema({
  castleName: { required: true, type: String },
  townName: String,
  treasury: Number,
  transactionrecord: [],
  improvements: [],
  construction: [],
  staff: [],
  guards: Number,
  servants: Number,
  laborers: Number,
  gameYear: Number,
  gameMonth: Number,
  gameDay: Number,
  notes: String
});

module.exports = mongoose.model('Stronghold', stronghold);