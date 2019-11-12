var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./models/user');
var Character = require('./models/character');
var Campaign = require('./models/campaign');
var jwt = require('jsonwebtoken');
var Verify = require('./verify');

router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.find({ owner: req.decoded.username }, function (err, characters) {
      if (err) throw err;
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      res.json(characters);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  var newchar = new Character({ ...req.body.character, owner: req.decoded.username });
  newchar.save(function(err, character) {
    if (err) throw err;
    console.log(character.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(character);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.character, _id: req.params.id } , { new: true }, function(err, character) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(character);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }, function(err) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

router.get('/invite/:id/:cid', Verify.verifyOrdinaryUser, async function(req, res, next) {
  var cha = await Character.findOne({ _id: req.params.id });
  var camp = await Campaign.findOne({ _id: req.params.cid, owner: req.decoded.username }, { _id: true, title: true, owner: true, invitedcharacters: true });
  let exists = camp.invitedcharacters.findIndex(function (a) {
    if (a._id === req.params.id) {
      return true;
    }
    else {
      return false;
    }
  });
  console.log(exists);
  if (exists === -1 && cha && camp) {
    camp.accepted = false;
    cha.campaigns.push(camp);
    camp.invitedcharacters.push({
      _id: cha._id,
      name: cha.name
    });
    cha.save();
    camp.save();
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }
  else {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: false });
  }
});

router.post('/acceptinvite/:id/:cid', Verify.verifyOrdinaryUser, function(req, res, next) {
  var cha = Character.findOne({ _id: req.params.id, owner: req.decoded.username });
  var camp = Campaign.findOne({ _id: req.params.cid });
});

router.get('/all', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.find({}, { owner: true, name: true, level: true }, function (err, characters) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(characters);
  });
});

module.exports = router;