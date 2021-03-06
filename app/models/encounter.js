var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Encounter = new Schema({
  name: { type: String, required: true },
  text: { type: String, default: "" },
  link: String,
  image: String,
  prereq: String,
  environment: String,
  tier: String,
  treasure: { type: String, default: "" },
  random: Boolean,
  complete: Boolean,
  sessionnotes: String,
  owner: String
});

module.exports = mongoose.model('Encounter', Encounter);