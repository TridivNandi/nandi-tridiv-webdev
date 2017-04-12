var express = require('express');

var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');

var app = express();
var secret = process.env.SESSION_SECRET || "Local Deployment";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: secret,
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var database = require('./database/database')(mongoose);
var security = require('./security/security')(database, passport);


require("./assignment/app.js")(app);
require("./project/app")(app, database, security);

var port = process.env.PORT || 3000;
app.listen(port);