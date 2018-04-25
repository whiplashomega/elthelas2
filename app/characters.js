var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./models/user');
var Character = require('./models/character');
var jwt = require('jsonwebtoken');
var Verify = require('./verify');

router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.find({ owner: req.decoded.username }, function (err, characters) {
      if (err) throw err;
      res.json(characters);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  var newchar = new Character(req.body.character);
  newchar.save(function(err, character) {
    if (err) throw err;
    res.json(character);    
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.character, _id: req.params.id } , { new: true }, function(err, character) {
    if (err) throw err;
    res.json(character);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }, function(err) {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;