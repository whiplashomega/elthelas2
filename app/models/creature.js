var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Creature = new Schema({
  name: { type: String, required: true },
  tags: [],
  size: String,
  type: String,
  subtype: String,
  cr: Number,
  alignment: String,
  ac: { type: String, default: "" },
  acdesc: String,
  hp: Number,
  pc: Number,
  hpdesc: String,
  hitdice: Number,
  speed: String,
  str: Number,
  dex: Number,
  con: Number,
  int: Number,
  wis: Number,
  cha: Number,
  skills: [],
  stats: [Number, Number, Number, Number, Number, Number],
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