
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./app/models');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('./app/public'));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

app.use(session({
  secret: "cats",
  resave: true,
  saveUninitialized: true
 }));

app.use(passport.initialize());
app.use(passport.session());


// // pass variables to our templates + all requests
// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });
 
require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);
require('./app/routes/user-apiRoutes')(app, passport);

//load passport strategies
require('./app/handlers/passport.js')(passport, db.Users);

db.sequelize.sync().then( () => {
  app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });
}); 