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
  var newenc = new Stronghold({ ...req.body.stronghold, owner: req.decoded.username });
  newenc.save(function(err, stronghold) {
  if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.stronghold, _id: req.params.id } , { new: true }, function(err, stronghold) {
    if (err) {
      res.status(401);
      console.log(err);
      res.json({ message: "Unauthorized", error: err });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }, function(err) {
    if (err) {
      res.status(401);
      console.log(err);
      res.json({ message: "Unauthorized", error: err });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;