var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Creature = new Schema({
  name: { type: String, required: true },
  tags: [],
  size: String,
  type: String,
  subtype: String,
  cr: String,
  alignment: String,
  ac: { type: String, default: "" },
  acdesc: String,
  hp: Number,
  hpdesc: String,
  speed: String,
  str: Number,
  dex: Number,
  con: Number,
  int: Number,
  wis: Number,
  cha: Number,
  skills: [],
  saves: String,
  senses: String,
  damageimmunities: String,
  conditionimmunities: String,
  languages: String,
  damageresistances: String,
  locations: String,
  latlong: [],
  description: String
});

module.exports = mongoose.model('Creature', Creature);