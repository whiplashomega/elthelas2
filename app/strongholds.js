var express = require('express');
var router = express.Router();
var Stronghold = require('./models/stronghold');
var Verify = require('./verify');

router.get('/', function(req, res) {
  Stronghold.find({}, function (err, strongholds) {
    if (err) throw err;
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(strongholds);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Stronghold({ ...req.body.stronghold });
  newenc.save(function(err, stronghold) {
    if (err) throw err;
    console.log(stronghold.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);    
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndUpdate({ _id: req.params.id }, { ...req.body.stronghold, _id: req.params.id } , { new: true }, function(err, stronghold) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;