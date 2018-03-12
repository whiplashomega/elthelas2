var mongoose = require('mongoose');

module.exports = mongoose.model('History', {
  date: { type: Number, required: true },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true }
});