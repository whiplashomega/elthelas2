var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NPC = new Schema({
  name: "",
  born: "",
  died: "",
  lastlocation: "",
  history: "",
  motivations: "",
  charid: "",
  player: "",
  campaigns: [],
  home: "",
  dmonly: false,
  job: "",
  knownassociates: "",
  ancestry: "",
  flags: []
});


module.exports = mongoose.model('NPC', NPC);