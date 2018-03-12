var mongoose = require('mongoose');

module.exports = mongoose.model('Divine', {
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  alignment: { 
    type: String, 
    enum: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil', 'Unaligned'],
    required: true
  },
  home: { type: String, required: true },
  type: {
    type: String,
    enum: ['Fey', 'Fiend', 'Angel', 'Alien'],
    required: true
  },
  description: { type: String, required: true }
});