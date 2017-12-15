const passport = require('passport');
const User = require('../models/User2');

// passport.use(User.createStrategy());




// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
function(username, password, next) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return next(err); }
    if (!user) {
      return next(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return next(null, false, { message: 'Incorrect password.' });
    }
    return next(null, user);
  });
}
));


// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});