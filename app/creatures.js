var express = require('express');
var router = express.Router();
var Creature = require('./models/creature');
var Verify = require('./verify');

function stmc(str) {
  str = str.replace(/600 ft/g, "180m");
  str = str.replace(/600 feet/g, "180m");
  str = str.replace(/600 foot/g, "180m");
  str = str.replace(/500 ft/g, "150m");
  str = str.replace(/500 feet/g, "150m");
  str = str.replace(/500 foot/g, "150m");
  str = str.replace(/300 ft/g, "90m");
  str = str.replace(/300 feet/g, "90m");
  str = str.replace(/300 foot/g, "90m");
  str = str.replace(/250 ft/g, "75m");
  str = str.replace(/250 feet/g, "75m");
  str = str.replace(/250 foot/g, "75m");
  str = str.replace(/240 ft/g, "72m");
  str = str.replace(/240 feet/g, "72m");
  str = str.replace(/240 foot/g, "72m");
  str = str.replace(/180 ft/g, "54m");
  str = str.replace(/180 feet/g, "54m");
  str = str.replace(/180 foot/g, "54m");
  str = str.replace(/100 ft/g, "30m");
  str = str.replace(/100 feet/g, "30m");
  str = str.replace(/100\/400 ft/g, "30/90m");
  str = str.replace(/100\/400 feet/g, "30/90m");
  str = str.replace(/100\/200 ft/g, "30/60m");
  str = str.replace(/100\/200 feet/g, "30/60m");
  str = str.replace(/100 foot/g, "30m");
  str = str.replace(/120 ft/g, "36m");
  str = str.replace(/120 feet/g, "36m");
  str = str.replace(/120 foot/g, "36m");
  str = str.replace(/150 ft/g, "45m");
  str = str.replace(/150 feet/g, "45m");
  str = str.replace(/150 foot/g, "45m");
  str = str.replace(/150\/600 ft/g, "45/135m");
  str = str.replace(/150\/600 feet/g, "45/135m");
  str = str.replace(/160 ft/g, "48m");
  str = str.replace(/160 feet/g, "48m");
  str = str.replace(/160 foot/g, "48m");
  str = str.replace(/10 ft/g, "3m");
  str = str.replace(/10 feet/g, "3m");
  str = str.replace(/10 foot/g, "3m");
  str = str.replace(/10-foot/g, "3m");
  str = str.replace(/15 ft/g, "4m");
  str = str.replace(/15 feet/g, "4m");
  str = str.replace(/15 foot/g, "4m");
  str = str.replace(/20 ft/g, "6m");
  str = str.replace(/20 feet/g, "6m");
  str = str.replace(/20 foot/g, "6m");
  str = str.replace(/20\/60 ft/g, "6m/18m");
  str = str.replace(/20\/60 feet/g, "6m/18m");
  str = str.replace(/25 ft/g, "7m");
  str = str.replace(/25 feet/g, "7m");
  str = str.replace(/25 foot/g, "7m");
  str = str.replace(/25\/100 ft/g, "7/21m");
  str = str.replace(/25\/100 feet/g, "7/21m");
  str = str.replace(/30 ft/g, "9m");
  str = str.replace(/30 feet/g, "9m");
  str = str.replace(/30 foot/g, "9m");
  str = str.replace(/30\/120 ft/g, "9/27m");
  str = str.replace(/30\/120 feet/g, "9/27m");
  str = str.replace(/35 ft/g, "10m");
  str = str.replace(/35 feet/g, "10m");
  str = str.replace(/35 foot/g, "10m");
  str = str.replace(/40 ft/g, "12m");
  str = str.replace(/40 feet/g, "12m");
  str = str.replace(/40 foot/g, "12m");
  str = str.replace(/45 ft/g, "13m");
  str = str.replace(/45 feet/g, "13m");
  str = str.replace(/45 foot/g, "13m");
  str = str.replace(/50 ft/g, "15m");
  str = str.replace(/50 feet/g, "15m");
  str = str.replace(/50 foot/g, "15m");
  str = str.replace(/50\/200 ft/g, "15/45m");
  str = str.replace(/50\/200 feet/g, "15/45m");
  str = str.replace(/60 ft/g, "18m");
  str = str.replace(/60 feet/g, "18m");
  str = str.replace(/60 foot/g, "18m");
  str = str.replace(/80 ft/g, "24m");
  str = str.replace(/80 feet/g, "24m");
  str = str.replace(/80 foot/g, "24m");
  str = str.replace(/80\/320 ft/g, "24/72m");
  str = str.replace(/80\/320 feet/g, "24/72m");
  str = str.replace(/90 ft/g, "27m");
  str = str.replace(/90 feet/g, "27m");
  str = str.replace(/90 foot/g, "27m");
  str = str.replace(/5 ft/g, "1m");
  str = str.replace(/5 feet/g, "1m");
  str = str.replace(/5 foot/g, "1m");
  str = str.replace(/5\/15 ft/g, "4/12m");
  str = str.replace(/5\/15 feet/g, "4/12m");

  return str;
}

function mc(creature) {
  creature.speed = stmc(creature.speed);
  creature.senses = stmc(creature.senses);
  creature.description = stmc(creature.description);

  return creature;
}

function throwerr(err, res) {
  res.status(500);
  console.log(err);
  res.json({ message: "Could not handle request due to errors" });
  return false;
}

router.get('/', function(req, res) {
  Creature.find({}, { name: true, size: true, cr: true, type: true, subtype: true, alignment: true, stats: true, hp: true, pc: true, speed: true, senses: true, description: true, hitdice: true }).then(function (creatures) {
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creatures);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.get('/:id', function(req, res) {
  Creature.findOne({ _id: req.params.id }).then(function (creature) {
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.get('/m/:id', function(req, res) {
  Creature.findOne({ _id: req.params.id }).then(function (creature) {
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(mc(creature));
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Creature({ ...req.body.creature });
  newenc.save().then(function(creature) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  }).catch(function(err) {
    throwerr(err, res);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndUpdate({ _id: req.params.id }, { ...req.body.creature, _id: req.params.id } , { new: true }).then(function(creature) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  }).catch(function(err) {
    throwerr(err, res);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndRemove({ _id: req.params.id }).then(function() {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }).catch((function(err) {
    throwerr(err, res);
  }));
});

module.exports = router;