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
  vassals: [],
  population: {
    invalid: 0,
    children: 0,
    adults: 0
  },
  autoSell: {},
  animals: [],
  laws: {},
  merchants: [],
  guards: Number,
  servants: Number,
  laborers: Number,
  gameYear: Number,
  gameMonth: Number,
  gameDay: Number,
  notes: String
});

module.exports = mongoose.model('Stronghold', stronghold);