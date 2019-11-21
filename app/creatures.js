var express = require('express');
var router = express.Router();
var Creature = require('./models/creature');
var Verify = require('./verify');

router.get('/', function(req, res) {
  Creature.find({}, { name: true, size: true, cr: true, type: true, subtype: true, alignment: true }, function (err, creatures) {
    if (err) throw err;
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creatures);
  });
});

router.get('/:id', function(req, res) {
  Creature.findOne({ _id: req.params.id }, function (err, creature) {
    if (err) throw err;
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);    
  })
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Creature({ ...req.body.creature });
  console.log(req.body.creature);
  newenc.save(function(err, creature) {
    if (err) throw err;
    console.log(creature.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);    
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndUpdate({ _id: req.params.id }, { ...req.body.creature, _id: req.params.id } , { new: true }, function(err, creature) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(creature);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Creature.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;