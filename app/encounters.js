var express = require('express');
var router = express.Router();
var Encounter = require('./models/encounter');
var Verify = require('./verify');

router.get('/', Verify.verifyOrdinaryUser, function(req, res) {
  Encounter.find({ owner: req.decoded.username }, function (err, encounters) {
    if (err) throw err;
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(encounters);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Encounter({ ...req.body.encounter, owner: req.decoded.username });
  newenc.save(function(err, encounter) {
    if (err) throw err;
    console.log(encounter.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(encounter);    
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Encounter.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.encounter, _id: req.params.id } , { new: true }, function(err, encounter) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(encounter);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Encounter.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }, function(err) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;