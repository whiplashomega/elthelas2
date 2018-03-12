var mongoose = require('mongoose');

module.exports = mongoose.model('Spell', {
  title: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  tags: [{type: String }],
  school: { type: String, required: true },
  level: { type: String, required: true },
  ritual: { type: Boolean, default: false },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  components: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
});