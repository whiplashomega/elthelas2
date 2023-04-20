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

router.get('/', function(req, res, next) {
  npc.find({}, function (err, npcs) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npcs);
  });
});

router.get('/:id', function (req, res, next) {
  npc.findOne({ _id: req.params.id }, function(err, npc) {
    if (err) throw err;
    if (npc === null) {
      res.status(404);
    } else {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
    }
    res.json(npc);
  });
});

router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  var newchar = new npc({ ...req.body.npc, owner: req.decoded.username });
  newchar.save(function(err, npc) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save npc due to errors" });
      return false;
    }
    console.log(npc.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npc);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  npc.findOneAndUpdate({ _id: req.params.id }, { ...req.body.npc, _id: req.params.id } , { new: true }, function(err, npc) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save npc due to errors" });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(npc);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  npc.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save npc due to errors" });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;