var express = require('express');
var router = express.Router();
var Campaign = require('./models/campaign');
var Verify = require('./verify');

function throwerr(err, res) {
  res.status(500);
  console.log(err);
  res.json({ message: "Could not handle request due to errors" });
  return false;
}

router.get('/', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.find({ owner: req.decoded.username }).then(function (campaigns) {
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaigns);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newcampaign = new Campaign({ ...req.body.campaign, owner: req.decoded.username });
  newcampaign.save().then(function(campaign) {
    console.log(req.body.campaign);
    console.log(campaign);
    console.log(campaign.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaign);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.campaign, _id: req.params.id } , { new: true }).then(function(campaign) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaign);
  }).catch(function (err) {
    throwerr(err, res);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }).then(function() {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  }).catch(function (err) {
    throwerr(err, res);
  });
});

module.exports = router;