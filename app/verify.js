var User = require('./models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/node');

exports.getToken = function(user) {
    var plain = { username: user.username, hash: user.hash };
    return jwt.sign(plain, config.secretKey, {});
};

exports.verifyOrdinaryUser = function(req, res, next) {
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //if there is no token return an error
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function(req, res, next) {
    User.findOne({ username: req.decoded.username }, function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
            return false;
        }
        if (user.admin) {
            req.decoded.admin = true;
            return next();
        } else {
            var error = new Error('Access Denied');
            error.status = 403;
            return next(error);
        }
    });
};