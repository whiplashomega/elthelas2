var express = require('express');
var router = express.Router();
var Creature = require('./models/creature');
var Verify = require('./verify');

function stmc(str) {
  str = str.replace(/5 ft/g, "1m");
  str = str.replace(/5 feet/g, "1m");
  str = str.replace(/5 foot/g, "1m");
  str = str.replace(/5\/15 ft/g, "4/12m");
  str = str.replace(/5\/15 feet/g, "4/12m");
  str = str.replace(/10 ft/g, "2m");
  str = str.replace(/10 feet/g, "2m");
  str = str.replace(/10 foot/g, "2m");
  str = str.replace(/15 ft/g, "3m");
  str = str.replace(/15 feet/g, "3m");
  str = str.replace(/15 foot/g, "3m");
  str = str.replace(/20 ft/g, "4m");
  str = str.replace(/20 feet/g, "4m");
  str = str.replace(/20 foot/g, "4m");
  str = str.replace(/20\/60 ft/g, "4m/12m");
  str = str.replace(/20\/60 feet/g, "4m/12m");
  str = str.replace(/25 ft/g, "5m");
  str = str.replace(/25 feet/g, "5m");
  str = str.replace(/25 foot/g, "5m");
  str = str.replace(/25\/100 ft/g, "5/15m");
  str = str.replace(/25\/100 feet/g, "5/15m");
  str = str.replace(/30 ft/g, "6m");
  str = str.replace(/30 feet/g, "6m");
  str = str.replace(/30 foot/g, "6m");
  str = str.replace(/30\/120 ft/g, "6/18m");
  str = str.replace(/30\/120 feet/g, "6/18m");
  str = str.replace(/35 ft/g, "7m");
  str = str.replace(/35 feet/g, "7m");
  str = str.replace(/35 foot/g, "7m");
  str = str.replace(/40 ft/g, "8m");
  str = str.replace(/40 feet/g, "8m");
  str = str.replace(/40 foot/g, "8m");
  str = str.replace(/45 ft/g, "9m");
  str = str.replace(/45 feet/g, "9m");
  str = str.replace(/45 foot/g, "9m");
  str = str.replace(/50 ft/g, "10m");
  str = str.replace(/50 feet/g, "10m");
  str = str.replace(/50 foot/g, "10m");
  str = str.replace(/50\/200 ft/g, "10/30m");
  str = str.replace(/50\/200 feet/g, "10/30m");
  str = str.replace(/60 ft/g, "12m");
  str = str.replace(/60 feet/g, "12m");
  str = str.replace(/60 foot/g, "12m");
  str = str.replace(/80 ft/g, "16m");
  str = str.replace(/80 feet/g, "16m");
  str = str.replace(/80 foot/g, "16m");
  str = str.replace(/80\/320 ft/g, "16/48m");
  str = str.replace(/80\/320 feet/g, "16/48m");
  str = str.replace(/90 ft/g, "18m");
  str = str.replace(/90 feet/g, "18m");
  str = str.replace(/90 foot/g, "18m");
  str = str.replace(/100 ft/g, "20m");
  str = str.replace(/100 feet/g, "20m");
  str = str.replace(/100\/400 ft/g, "20/60m");
  str = str.replace(/100\/400 feet/g, "20/60m");
  str = str.replace(/100\/200 ft/g, "20/40m");
  str = str.replace(/100\/200 feet/g, "20/40m");
  str = str.replace(/100 foot/g, "20m");
  str = str.replace(/120 ft/g, "24m");
  str = str.replace(/120 feet/g, "24m");
  str = str.replace(/120 foot/g, "24m");
  str = str.replace(/150 ft/g, "30m");
  str = str.replace(/150 feet/g, "30m");
  str = str.replace(/150 foot/g, "30m");
  str = str.replace(/150\/600 ft/g, "30/90m");
  str = str.replace(/150\/600 feet/g, "30/90m");
  str = str.replace(/160 ft/g, "32m");
  str = str.replace(/160 feet/g, "32m");
  str = str.replace(/160 foot/g, "32m");
  str = str.replace(/180 ft/g, "36m");
  str = str.replace(/180 feet/g, "36m");
  str = str.replace(/180 foot/g, "36m");
  str = str.replace(/240 ft/g, "48m");
  str = str.replace(/240 feet/g, "48m");
  str = str.replace(/240 foot/g, "48m");
  str = str.replace(/250 ft/g, "50m");
  str = str.replace(/250 feet/g, "50m");
  str = str.replace(/250 foot/g, "50m");
  str = str.replace(/300 ft/g, "60m");
  str = str.replace(/300 feet/g, "60m");
  str = str.replace(/300 foot/g, "60m");
  str = str.replace(/500 ft/g, "100m");
  str = str.replace(/500 feet/g, "100m");
  str = str.replace(/500 foot/g, "100m");
  str = str.replace(/600 ft/g, "120m");
  str = str.replace(/600 feet/g, "120m");
  str = str.replace(/600 foot/g, "120m");

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
  Creature.find({}, { name: true, size: true, cr: true, type: true, subtype: true, alignment: true, stats: true, hp: true, pc: true, speed: true, senses: true, description: true, hitdice: true }, function (err, creatures) {
    if (err) return throwerr(err, res);
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creatures);
  });
});

router.get('/:id', function(req, res) {
  Creature.findOne({ _id: req.params.id }, function (err, creature) {
    if (err) return throwerr(err, res);
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  })
});

router.get('/m/:id', function(req, res) {
  Creature.findOne({ _id: req.params.id }, function (err, creature) {
    if (err) return throwerr(err, res);
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(mc(creature));
  })
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Creature({ ...req.body.creature });
  newenc.save(function(err, creature) {
    if (err) return throwerr(err, res);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndUpdate({ _id: req.params.id }, { ...req.body.creature, _id: req.params.id } , { new: true }, function(err, creature) {
    if (err) return throwerr(err, res);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) return throwerr(err, res);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;