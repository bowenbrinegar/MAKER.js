const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.logout = (req, res) => {
  req.session.destroy( err => res.redirect('/'));
};