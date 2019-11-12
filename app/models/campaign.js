var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Character = require('./character.js');
var Encounter = require('./encounter.js');

var Chapter = new Schema({
  id: Number,
  title: { type: String, required: true },
  encounters: []
});

var Campaign = new Schema({
  title: { type: String, required: true },
  chapters: [Chapter],
  url: { type: String, required: true, unique: true },
  playercharacters: [],
  invitedcharacters: [],
  owner: String
});

module.exports = mongoose.model('Campaign', Campaign);