
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = (app, passport) => {
 
  app.get('/login', userController.loginForm);
  app.post('/login',
    passport.authenticate('login', {
      failureRedirect: '/login',
      failureFlash: 'Failed Login!',
      successRedirect: '/protected',
      successFlash: 'You are now logged in!'
    })
  );

  app.get('/register', userController.registerForm);

  // 1. Validate the registration data
  // 2. Register the user
  // 3. Log in the user after registration
  app.post('/register',
    userController.validateRegister,
    passport.authenticate('local-signup', {
      failureRedirect: '/register',
      failureFlash: 'Failed Login!',
      successRedirect: '/protected',
      successFlash: 'You are now logged in!'
    })
  );

  app.get('/logout', authController.logout);

  app.get('/protected',
    authController.isLoggedIn,
    userController.protected);

};
