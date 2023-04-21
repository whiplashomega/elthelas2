var express = require('express');
var router = express.Router();
var history = require('./models/history');
var Verify = require('./verify');

/*router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  history.find({ owner: req.decoded.username }, function (err, historys) {
      if (err) throw err;
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      res.json(historys);
  });
});*/

router.get('/', function(req, res, next) {
  history.find({}, function (err, historys) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(historys);
  });
});

router.get('/:id', function (req, res, next) {
  history.findOne({ _id: req.params.id }, function(err, history) {
    if (err) throw err;
    if (history === null) {
      res.status(404);
    } else {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
    }
    res.json(history);
  });
});

router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  var newchar = new history({ ...req.body.history, owner: req.decoded.username });
  newchar.save(function(err, history) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save history due to errors" });
      return false;
    }
    console.log(history.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(history);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  history.findOneAndUpdate({ _id: req.params.id }, { ...req.body.history, _id: req.params.id } , { new: true }, function(err, history) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save history due to errors" });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(history);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  history.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ message: "Could not save history due to errors" });
      return false;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;