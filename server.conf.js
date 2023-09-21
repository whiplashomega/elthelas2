// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var passport = require('passport');
var authenticate = require('./app/authenticate');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const socket = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
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
    mongoose.connect(config.mongoUrl, { }).catch(function(err, res) {
        if(err) {
            console.log('ERROR connecting to: ' + config.mongoUrl + '. ' + err);
        } else {
            console.log('Succeeded connecting to: ' + config.mongoUrl);
        }
    });

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(cors());
    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    console.log('loaded bodyParser');
    app.use(methodOverride('X-HTTP-Method-Override'));
    console.log('methodOverride started');
     app.use(passport.initialize());

    // routes ==================================================
    var server = app.listen(config.port);
    var io = socket(server);
    let sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
    //console.log(process.env.ENVIRONMENT);
    app.use(session({
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 2419200000
        },
        secret: "whodawada"
    }));
    io.use(passportSocketIo.authorize({
        key: 'connect.sid',
        secret: "whodawada",
        store: sessionStore,
        passport: passport,
        cookieParser: cookieParser
    }))
        // next line is the money
    app.set('socketio', io);


    io.on('invitationSent', function(socket) {
       console.log(socket);
    });
    require('./app/routes')(app, config.staticDir, server); // configure our routes
    console.log('app routes');
    // start app ===============================================
    // startup our app at http://localhost:8080
    // shoutout to the user
    console.log('Magic happens on port ' + config.port);
};

app.stop = function() {
    app.close();
};
// expose app
exports = module.exports = app;