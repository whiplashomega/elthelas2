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
    passport.authenticate('local', function(err, user, info) {
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
               user: user,
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
        User.find({ username: req.params.username }, function (err, user) {
            if (err) throw err;
            if (req.decoded._doc.username === req.params.username) {
                res.json(user[0]);
            } 
        });
    })
    .put(Verify.verifyOrdinaryUser, function(req, res) { 
        User.find({ username: req.params.username }, function (err, user) {
            if (err) throw err;
            if (req.decoded._doc.username === req.params.username) {
                User.findOneAndUpdate({ username: req.params.username }, {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password
                }, {
                    new: true
                }, function (err, user) {
                    if (err) throw err;
                    res.json(user);
                });
            } 
        });
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res) { 
        User.find({ username: req.params.username }, function (err, user) {
            if (err) throw err;
            
            if (req.decoded._doc.username === req.params.username) {
                User.findOneAndRemove({ username: req.params.username }, function (err, user) {
                    if (err) throw err;
                    res.json(user);
                });
            } 
        });
    });
    
module.exports = router;
