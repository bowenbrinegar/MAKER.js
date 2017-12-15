
const db = require('../models');
const path = require('path');
const User = db.User;
const promisify = require('es6-promisify');
// const passport = require('passport');
const bCrypt = require('bcrypt-nodejs');



exports.loginForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/loginForm.html'));
};

exports.registerForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registerForm.html'));
};

exports.validateRegister = (req, res, next) => {
  
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match!').equals(req.body.password);

  console.log('validation complete');

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    // res.sendFile(path.join(__dirname, '../public/registerForm.html'));
    console.log('error!!!!');
    console.log(errors);
    res.sendFile(path.join(__dirname, '../public/registerForm.html'));
    return; // Stop the function from running
  }
  console.log('No validation errors');
  next(); // There were no errors
};

exports.register = (req, res, next) => {
  console.log('register has begun');
  
  const generateHash = function(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
  };
  
  User.findOne({
    where: {
        email: req.body.email
    }
  }).then( function(user) {
         
    if (user) {
        console.log('User exists with name', user.name);
        console.log('password', user.password);
      return done(null, false, {
        message: 'That email is already taken'
      });
    } else {
        let userPassword = generateHash(req.body.password);
        console.log('new user password', userPassword);
        
        let data = {
          email: req.body.email,
          password: userPassword,
          name: req.body.name
        };
         
        User.create(data)
        .then(function(newUser, created) {
          if (!newUser) {
            // return done(null, false);
            next();
          }
          if (newUser) {
            // return done(null, newUser);
            next();
          }
        });
      }
    });
};

exports.protected = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/protected.html'));
};

  