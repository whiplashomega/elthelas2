var mongoose = require('mongoose');

module.exports = mongoose.model('Organization', {
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  nations: { type: Array, required: false },
  cities: { type: Array, required: false },
  tenets: { type: Array, required: false },
  level1: { type: String, required: false, default: "" },
  level10: { type: String, required: false, default: "" }
});