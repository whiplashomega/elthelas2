var express = require('express');
var router = express.Router();
var Stronghold = require('./models/stronghold');
var Verify = require('./verify');

function throwerr(err, res) {
  res.status(500);
  console.log(err);
  res.json({ message: "Could not handle request due to errors" });
  return false;
}
router.get('/', function(req, res) {
  Stronghold.find({}).then(function (strongholds) {
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(strongholds);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newenc = new Stronghold({ ...req.body.stronghold, owner: req.decoded.username });
  console.log(newenc);
  newenc.save().then(function(stronghold) {
    //console.log(stronghold);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.stronghold, _id: req.params.id } , { new: true }).then(function(stronghold) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(stronghold);
  }).catch(function (err) {
    res.status(401);
    console.log(err);
    res.json({ message: "Unauthorized", error: err });
    return false;
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Stronghold.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }).then(function() {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }).catch(function (err) {
    res.status(401);
    console.log(err);
    res.json({ message: "Unauthorized", error: err });
    return false;
  });
});

module.exports = router;