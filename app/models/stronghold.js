var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var stronghold = new Schema({
  castleName: { required: true, type: String },
  townName: String,
  treasury: Number,
  resources: {},
  transactionrecord: [],
  improvements: [],
  construction: [],
  privateEnterprise: [],
  privateEmployees: [],
  staff: [],
  vassals: [],
  population: {
    invalid: Number,
    children: Number,
    adults: Number,
    elderly: Number
  },
  autoSell: {},
  animals: [],
  laws: {},
  merchants: [],
  guards: Number,
  owner: { type: String, default: "whiplashomega" },
  servants: Number,
  laborers: Number,
  gameYear: Number,
  gameMonth: Number,
  gameDay: Number,
  notes: String
});

module.exports = mongoose.model('Stronghold', stronghold);