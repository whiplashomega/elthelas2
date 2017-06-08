/* globals appRoot */

    module.exports = function(app, staticDir) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        /*app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });*/
        
        var users = require('./users');
        app.use('/users', users);
        
        var generalizedRouteProvider = function(app, Model) {
            var Verify = require('./verify');
            var express = require('express');
            
            var thisRouter = express.router();
            
            thisRouter.route('/')
            .get(function (req, res, next) {
                Model.find({}, function(err, item) {
                    if (err) throw err;
                    res.json(item);
                });
            })
            .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
                Model.create(req.body, function (err, item) {
                    if (err) throw err;
                    var id = item._id;
                    res.json({ success: true, id: id });
                })
            })
            .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
                Model.remove({}, function(err, resp) {
                    if (err) throw err;
                    res.json(resp);
                });
            });
            
            thisRouter.route('/:itemId')
            .get(function(req, res, next) {
              Model.findById(req.params.itemId, function (err, item) {
                  if (err) throw err;
                  res.json(item);
              });
            })
            .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
                Model.findByIdAndUpdate(req.params.itemId, {
                    $set: req.body
                }, {
                    new: true
                }, function(err, item) {
                    if(err) throw err;
                    res.json(item);
                });
            })
            .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
                Model.findByIdAndRemove(req.params.itemId, function(err, resp) {
                    if (err) throw err;
                    res.json(resp);
                });
            });
            return thisRouter;
        }
        
        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendFile(appRoot+staticDir+'/index.html'); // load our public/index.html file
        });

    };
