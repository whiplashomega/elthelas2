var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var stronghold = new Schema({
  castleName: { required: true, type: String },
  townName: String,
  treasury: 0,
  resources: {},
  transactionrecord: [],
  improvements: [],
  construction: [],
  privateEnterprise: [],
  privateEmployees: [],
  staff: [],
  animals: [],
  laws: {},
  guards: Number,
  servants: Number,
  laborers: Number,
  gameYear: Number,
  gameMonth: Number,
  gameDay: Number,
  notes: String
});

module.exports = mongoose.model('Stronghold', stronghold);