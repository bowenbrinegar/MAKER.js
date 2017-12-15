var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var passport = require('passport');
var flash = require('connect-flash');
var helpers = require('./helpers');
var promisify = require('es6-promisify');
var errorHandlers = require('./app/handlers/errorHandlers');

require('./app/handlers/passport');


// Create our Express app
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./app/models");

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serves up static files from the public folder
app.use(express.static("./app/public"));

// Exposes methods for validating data. Used heavily on the uerController.validateRegister
app.use(expressValidator());

// Populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: 'maker guys',
  resave: true,
  saveUninitialized: true
  // store: new SequelizeStore({
  //   db: sequelize
  // })
}));

// PassportJS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('error', 'Crap!'), which will then pass the message to the next page the user requests
app.use(flash());

// Pass variables to our templates + all requests
app.use( (req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Promisify some callback based APIs
app.use( (req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// After all the above middleware, we are handle our own routes
require("./app/routes/apiRoutes.js")(app);
require('./app/routes/user-apiRoutes')(app);
require("./app/routes/htmlRoutes.js")(app);

// If the above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  // Development Error Handler - Prints stack trace
  app.use(errorHandlers.developmentErrors);
}

// Production error handler
app.use(errorHandlers.productErrors);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// Done!
module.exports = app;
