var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var History = new Schema({
  text: {
    headline: "",
    text: ""
  },
  start_date: {
    day: Number,
    month: Number,
    year: Number
  },
  end_date: {
    day: Number,
    month: Number,
    year: Number
  }
});


module.exports = mongoose.model('History', History);