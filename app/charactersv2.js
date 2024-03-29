var express = require('express');
var router = express.Router();
var Character = require('./models/characterv2');
var Campaign = require('./models/campaign');
var Verify = require('./verify');

/*router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.find({ owner: req.decoded.username }, function (err, characters) {
      if (err) throw err;
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      res.json(characters);
  });
});*/

router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.find({ owner: req.decoded.username }, { owner: true, name: true, charclasses: true, group: true }).then(function (characters) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(characters);
  }).catch(function (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

router.get('/:id', function (req, res, next) {
  Character.findOne({ _id: req.params.id }).then(function(character) {
    if (character === null) {
      res.status(404);
    } else {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
    }
    res.json(character);
  }).catch(function (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  var newchar = new Character({ ...req.body.character, owner: req.decoded.username });
  if (newchar._id) {
    newchar._id = null;
  }
  newchar.save().then(function(character) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(character);
  }).catch(function(err) {
    console.log(err);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.character, _id: req.params.id } , { new: true }).then(function(character) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(character);
  }).catch(function (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res, next) {
  Character.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }).then(function() {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }).catch(function (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

router.get('/invite/:id/:cid', Verify.verifyOrdinaryUser, async function(req, res, next) {
  var cha = await Character.findOne({ _id: req.params.id });
  var camp = await Campaign.findOne({ _id: req.params.cid, owner: req.decoded.username }, { _id: true, title: true, owner: true, invitedcharacters: true });
  let exists = camp.invitedcharacters.findIndex(function (a) {
    if (a._id === req.params.id) {
      return true;
    }
    else {
      return false;
    }
  });
  console.log(exists);
  if (exists === -1 && cha && camp) {
    camp.accepted = false;
    cha.campaigns.push(camp);
    camp.invitedcharacters.push({
      _id: cha._id,
      name: cha.name
    });
    cha.save();
    camp.save();
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }
  else {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: false });
  }
});

router.post('/acceptinvite/:id/:cid', Verify.verifyOrdinaryUser, function(req, res, next) {
  var cha = Character.findOne({ _id: req.params.id, owner: req.decoded.username });
  var camp = Campaign.findOne({ _id: req.params.cid });
});

module.exports = router;