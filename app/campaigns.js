var express = require('express');
var router = express.Router();
var Campaign = require('./models/campaign');
var Verify = require('./verify');

router.get('/', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.find({ owner: req.decoded.username }, function (err, campaigns) {
    if (err) throw err;
    res.header('Cache-Control', "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaigns);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res) {
  var newcampaign = new Campaign({ ...req.body.campaign, owner: req.decoded.username });
  newcampaign.save(function(err, campaign) {
    if (err) throw err;
    console.log(campaign.id);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaign);    
  });
});

router.post('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.findOneAndUpdate({ _id: req.params.id, owner: req.decoded.username }, { ...req.body.campaign, _id: req.params.id } , { new: true }, function(err, campaign) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(campaign);
  });
});

router.delete('/:id', Verify.verifyOrdinaryUser, function(req, res) {
  Campaign.findOneAndRemove({ _id: req.params.id, owner: req.decoded.username }, function(err) {
    if (err) throw err;
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({ success: true });
  });
});

module.exports = router;