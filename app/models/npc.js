var mongoose = require('mongoose');
var User = require('./user');

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
  knownassociates: ""
});


module.exports = mongoose.model('NPC', NPC);