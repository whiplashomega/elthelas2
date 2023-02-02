var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Creaturev2 = new Schema({
  name: { type: String, required: true },
  size: String,
  type: String,
  subtype: String,
  alignment: String,
  ac: { type: Number, default: 10 },
  pc: { type: Number, default: 0 },
  acdesc: String,
  hitdice: Number,
  initmod: Number,
  speed: [Number],
  stats: [Number],
  spells: [],
  casterlevel: { type: Number, default: 0 },
  skills: [],
  saves: [],
  senses: String,
  dr: { type: Object, default: {
    piercing: 0,
    slashing: 0,
    bludgeoning: 0,
    acid: 0,
    cold: 0,
    fire: 0,
    force: 0,
    lightning: 0,
    necrotic: 0,
    poison: 0,
    psychic: 0,
    radiant: 0,
    thunder: 0
  }},
  features: [],
  actions: [],
  attacks: [],
  conditions: [],
  legendaryactions: [],
  crmods: {},
  languages: String,
  locations: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Creaturev2', Creaturev2);