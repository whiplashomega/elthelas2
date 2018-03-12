var mongoose = require('mongoose');

module.exports = mongoose.model('God', {
  id: { type: String, unique: true, required: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  holysymbol: { type: String, required: true },
  alignment: { 
    type: String, 
    enum: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil', 'Unaligned'],
    required: true
  },
  domains: { type: Array, required: true },
  domains5: { type: Array, required: true },
  interfaithblessing: { type: String, required: true },
  worshippers: { type: String, required: true },
  allowedalignments: { type: Array, required: true },
  weapon: { type: String, required: true },
  appearance: { type: String, required: true },
  dogma: { type: String, required: true },
  clergy: { type: String, required: true },
  home: { type: String, required: true }
});