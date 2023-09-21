var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NPC = new Schema({
  name: { type: String, default: "" },
  born: { type: String, default: "" },
  died: { type: String, default: "" },
  lastlocation: { type: String, default: "" },
  history: { type: String, default: "" },
  motivations: { type: String, default: "" },
  charid: { type: String, default: "" },
  player: { type: String, default: "" },
  campaigns: [],
  home: { type: String, default: "" },
  dmonly: { type: Boolean, default: false },
  job: { type: String, default: "" },
  knownassociates: { type: String, default: "" },
  ancestry: { type: String, default: "" },
  flags: []
});


module.exports = mongoose.model('NPC', NPC);