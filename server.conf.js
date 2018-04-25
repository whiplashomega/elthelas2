// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var passport = require('passport');
var authenticate = require('./app/authenticate');
// configuration ===========================================

// config files
var config = require('./config/node');
// set our port
var path = require('path');
global.appRoot = path.resolve(__dirname) + config.staticDir;

app.start = function() { 
    console.log("starting");
    // connect to our mongoDB database 
    // (uncomment after you enter in your own credentials in config/db.js)
    mongoose.connect(config.mongoUrl + "?authMechanism=SCRAM-SHA-1", function(err, res) {
        if(err) {
            console.log('ERROR connecting to: ' + config.mongoUrl + '. ' + err);
        } else {
            console.log('Succeeded connecting to: ' + config.mongoUrl);
        }
    }); 
    
    // get all data/stuff of the body (POST) parameters
    // parse application/json 
    app.use(bodyParser.json({limit: '50mb'})); 
    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(express.static(__dirname + '/dist', { maxAge: 365 }));
    console.log('loaded bodyParser');
    
    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override')); 
    console.log('methodOverride started');
    app.use(passport.initialize());    
    // set the static files location /public/img will be /img for users
    app.use(express.static('.')); 
    console.log("express static loaded");
    // routes ==================================================
    require('./app/routes')(app, config.staticDir); // configure our routes
    console.log('app routes');
    // start app ===============================================
    // startup our app at http://localhost:8080
    app.listen(config.port);
    // shoutout to the user                     
    console.log('Magic happens on port ' + config.port);    
}

app.stop = function() {
    app.close();
}
// expose app           
exports = module.exports = app;    