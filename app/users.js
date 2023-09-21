var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var Verify = require('./verify');
/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  User.find({}).then(function (users) {
    res.json(users);
  }).catch(function (err) {
    console.log(err);
  });
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password).then(function(user) {
    if(req.body.firstname) {
      user.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
      user.lastname = req.body.lastname;
    }
    if(req.body.admin === 'adminauthpassword') {
      user.admin = true;
    }
    user.save().then(function(user) {
      passport.authenticate('local')(req, res, function () {
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          var token = Verify.getToken(user);
          res.status(200).json({
            status: 'Login successful!',
            user: user,
            success: true,
            token: token
          });
        });
      });
    }).catch(function (err) {
      return res.status(500).json({err: err});
    });
  }).catch(function (err) {
    return res.status(500).json({err: err});
  });
});

router.post('/login', function(req, res, next) {
  console.log('begin user login');
  passport.authenticate('local', function(err, user, info) {
    console.log("callback begin");
    if (err) {
      console.log('Authentication error: ' + err);
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log(user);
        console.log(err);
        return res.status(500).json({
          err: "Could not login User"
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          admin: user.admin,
          _id: user._id,
          username: user.username
        },
        token: token
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.route('/:username').get(Verify.verifyOrdinaryUser, function(req, res) {
  User.find({ username: req.decoded.username }).then(function (user) {
    if (req.decoded._doc.username === req.params.username) {
      res.json(user[0]);
    }
  }).catch(function (err) {
    console.log(err);
  });
}).put(Verify.verifyOrdinaryUser, function(req, res, next) {
  console.log("begin change password");
  User.find({ username: req.decoded.username }).then(function (user) {
    console.log("found user");
    console.log(req.params.username);
    console.log(req.decoded.username);
    console.log(req.params);
    if (req.decoded.username === req.params.username) {
      User.findOne({ username: req.params.username }).then(function (err, user) {
      if (err) {
        console.log(user);
        console.log(err);
        return res.status(500).json({
          err: "Could not find user"
        });
      }
      user.setPassword(req.body.newpassword, function (err, user) {
        if (err) {
          console.log(user);
          console.log(err);
          return res.status(500).json({
            err: "Could not change password"
          });
        }
        user.save().then(function(err) {
          if (err) {
            console.log(user);
            console.log(err);
            return res.status(500).json({
              err: "Could not save user"
            });
          }
          var token = Verify.getToken(user);
          res.status(200).json({
            status: 'Login successful!',
            success: true,
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              admin: user.admin,
              _id: user._id,
              username: user.username
            },
            token: token
          });
        }).catch(function(err) {
          console.log(err);
        });
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
});
}).delete(Verify.verifyOrdinaryUser, function(req, res) {
  User.find({ username: req.decoded.username }).then(function (user) {
    if (req.decoded._doc.username === req.params.username) {
      User.findOneAndRemove({ username: req.params.username }).then(function (user) {
        res.json(user);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }).catch(function(err) {
    console.log(err);
  });
});
router.route('/guidesetting')
.post(Verify.verifyOrdinaryUser, function(req, res) {
    User.findOneAndUpdate({ username: req.decoded.username }, {
        showguide: req.body.guidesetting
    }, { new: true }).then(function (user) {
        res.json({ success: true });
    }).catch (function (err) {
      console.log(err);
    });
});
router.route('/themesetting')
.post(Verify.verifyOrdinaryUser, function(req, res) {
    console.log("started route execution");
    User.findOneAndUpdate({ username: req.decoded.username }, {
        themesetting: req.body.themesetting
    }, { new: true }).then(function (user) {
        console.log("found user to update");
        res.json({ success: true });
    }).catch(function (err) {
      console.log(err);
    });
});
module.exports = router;
