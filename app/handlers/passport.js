const bCrypt = require('bcrypt-nodejs');
// const db = require('../models');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;
  console.log('passport has begun');


  passport.use('local-signup', new LocalStrategy(
    
      {
           usernameField: 'email',
           passwordField: 'password',
           passReqToCallback: true // allows us to pass back the entire request to the callback
    
      }, function(req, email, password, done) {

        console.log('passport callback has begun');

        const generateHash = function(password) {
          return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(8),
              null);
        };

        User.findOne({
          where: {
              email: email
          }
        }).then( function(user) {
       
          if (user) {
              console.log('User exists with name', user.name);
              console.log('password', user.password);
            return done(null, false, {
              message: 'That email is already taken'
            });
          } else {
                var userPassword = generateHash(password);
                console.log('new user password', userPassword);
                var data = {
                  email: email,
                  password: userPassword,
                  name: req.body.name
                };
       
                User.create(data)
                .then(function(newUser, created) {
                  if (!newUser) {
                    return done(null, false);
                  }
                  if (newUser) {
                    return done(null, newUser);
                  }
                });
            }
        });
      }
   ));

   //serialize
    passport.serializeUser(function(user, done) {
       done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
       User.findById(id).then(function(user) {
           if (user) {
               done(null, user.get());
           } else {
               done(user.errors, null);
           }
       });
   });

   // Local login
   passport.use('login', new LocalStrategy(
       {
           usernameField: 'email',
           password: 'password',
           passReqToCallback: true
       },
       function(req, email, password, done){
           console.log('logging in');
          let User = user;
           
          const isValidPassword = (userPass, password) => {
            return bCrypt.compareSync(password, userPass);
           };

           User.findOne({
               where: {
                   email: email
               }
           }).then( function(user) {
               if (!user) {
                   console.log('Email does not exist');
                   return done(null, false, {
                       message: 'Email does not exist!'
                   });
               }
               if (!isValidPassword(user.password, password)) {
                   console.log('Incorrect password');
                return done(null, false, {
                    message: 'Incorrect password!'
                });
               }

               let userInfo = user.get();
               return done(null, userInfo);
           }).catch( err => {
               console.log('Error', err);
               return done(null, false, {
                   message: 'Something went wrong!'
               });
            });
       }
   ));
};


