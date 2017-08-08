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
var db = require('./config/db');

// set our port
var path = require('path');
global.appRoot = path.resolve(__dirname);

app.start = function() {
    var port = process.env.PORT || 8080; 
    
    if(port == 8080) {
        var staticDir = '/dev';
    } else {
        var staticDir = '/web';
    }
    // connect to our mongoDB database 
    // (uncomment after you enter in your own credentials in config/db.js)
    mongoose.connect(db.url); 
    
    //detect preexisting data and seed the database if not found
    /*User.find({}, function(err, user) {
        if(err) throw err;
        if(user.length > 0) {
           //we are good
           return;
        } else {
           //seed the database
            seeder.start(__dirname + './json', [
                /**
                 * @path (string, required) : path to model
                 * @name (string, required) : name of model
                 * @clear (boolean, required) : clear DB collection flag
                 */
                 /*{ path: 'app/models/divines.js', name: 'Divine', clear: true },
                 { path: 'app/models/gods.js', name: 'God', clear: true },
                 { path: 'app/models/history.js', name: 'History', clear: true },
                 { path: 'app/models/organizations.js', name: 'Organization', clear: true },
                 { path: 'app/models/races.js', name: 'Race', clear: true },
                 { path: 'app/models/spells.js', name: 'Race', clear: true },
                 { path: 'app/models/user.js', name: 'User', clear: true }
            ]);
       }
    });*/
    
    // get all data/stuff of the body (POST) parameters
    // parse application/json 
    app.use(bodyParser.json()); 
    
    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 
    
    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override')); 

    app.use(passport.initialize());    
    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + staticDir)); 
     
    // routes ==================================================
    require('./app/routes')(app, staticDir); // configure our routes
    
    // start app ===============================================
    // startup our app at http://localhost:8080
    app.listen(port);
    // shoutout to the user                     
    console.log('Magic happens on port ' + port);    
}

app.stop = function() {
    app.close();
}
// expose app           
exports = module.exports = app;    