var mongoose = require('mongoose');

var agepointsSchema = new mongoose.Schema({
  puberty: { type: Number, required: true },
  sexualmaturity: { type: Number, required: true },
  mentalmaturity: { type: Number, required: true },
  middleage: { type: Number, required: true },
  oldage: { type: Number, required: true },
  averagelifespan: { type: Number, required: true },
  maxage: { type: Number, required: true }
});


var subraceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, default : "" },
  traits: [{type: String}],
  averageheight: { type: Number, default: 0 },
  baseheight: { type: Number, default: 0 },
  heightroll: { type: String },
  averageweight: { type: Number, default: 0 },
  baseweight: { type: Number, default: 0 },
  weightroll: { type: String }
});

module.exports = mongoose.model('Race', {
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  traits: { type: Array, required: false },
  agepoints: [agepointsSchema],
  subraces: [subraceSchema]
});