var express = require('express');
var router = express.Router();
var npc = require('./models/npc');
var Verify = require('./verify');

/*router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  npc.find({ owner: req.decoded.username }, function (err, npcs) {
      if (err) throw err;
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      res.json(npcs);
  });
});*/

function throwerr(err, res) {
  res.status(500);
  console.log(err);
  res.json({ message: "Could not handle request due to errors" });
  return false;
}

router.get('/', function(req, res, next) {
  npc.find({}).then(function (npcs) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npcs);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.get('/:id', function (req, res, next) {
  npc.findOne({ _id: req.params.id }).then(function(npc) {
    if (npc === null) {
      res.status(404);
    } else {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
    }
    res.json(npc);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  var newchar = new npc({ ...req.body.npc, owner: req.decoded.username });
  newchar.save().then(function(npc) {
    console.log(npc.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npc);
  }).catch(function (err) {
    res.status(500);
    console.log(err);
    res.json({ message: "Could not save npc due to errors" });
    return false;
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  npc.findOneAndUpdate({ _id: req.params.id }, { ...req.body.npc, _id: req.params.id } , { new: true }).then(function(npc) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npc);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  npc.findOneAndRemove({ _id: req.params.id }, function() {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }).catch(function(err) {
    throwerr(err, res);
  });
});

module.exports = router;