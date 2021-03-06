var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var Verify = require('./verify');
/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    User.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
});

router.get('/facebook', passport.authenticate('facebook'), function(req, res) {});

router.get('/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if(!user) {
            return res.status(401).json({
                err: info
            });
        }
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
    })(req, res, next);
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        if(req.body.admin === 'adminauthpassword') {
            user.admin = true;
        }
        user.save(function(err,user) {
            if (err) throw err;
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
        });
    });
});

router.post('/login', function(req, res, next) {
    console.log('begin user login');
    passport.authenticate('local', function(err, user, info) {
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

router.route('/:username')
    .get(Verify.verifyOrdinaryUser, function(req, res) {
        User.find({ username: req.decoded.username }, function (err, user) {
            if (err) throw err;
            if (req.decoded._doc.username === req.params.username) {
                res.json(user[0]);
            } 
        });
    })
    .put(Verify.verifyOrdinaryUser, function(req, res, next) {
        console.log("begin change password");
        User.find({ username: req.decoded.username }, function (err, user) {
            if (err) throw err;
            console.log("found user");
            console.log(req.params.username);
            console.log(req.decoded.username);
            console.log(req.params);
            if (req.decoded.username === req.params.username) {
                User.findOne({ username: req.params.username }, function (err, user) {
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
                    user.save(function(err) {
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
                      });
                   });
                });
            }
        });
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res) { 
        User.find({ username: req.decoded.username }, function (err, user) {
            if (err) throw err;
            
            if (req.decoded._doc.username === req.params.username) {
                User.findOneAndRemove({ username: req.params.username }, function (err, user) {
                    if (err) throw err;
                    res.json(user);
                });
            } 
        });
    });
router.route('/guidesetting')
.post(Verify.verifyOrdinaryUser, function(req, res) {
    User.findOneAndUpdate({ username: req.decoded.username }, {
        showguide: req.body.guidesetting
    }, { new: true }, function (err, user) {
        if (err) throw err;
        res.json({ success: true });
    });
});
router.route('/themesetting')
.post(Verify.verifyOrdinaryUser, function(req, res) {
    console.log("started route execution");
    User.findOneAndUpdate({ username: req.decoded.username }, {
        themesetting: req.body.themesetting
    }, { new: true }, function (err, user) {
        if (err) throw err;
        console.log("found user to update");
        res.json({ success: true });
    });
});
module.exports = router;
