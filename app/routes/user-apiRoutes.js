
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = (app, passport) => {
 
  // app.get('/login', userController.loginForm);
  app.post('/login',
    passport.authenticate('login', {
      failureRedirect: '/',
      successRedirect: '/'
    })
  );

  app.get('/signup', userController.registerForm);

  // 1. Validate the registration data
  // 2. Register the user
  // 3. Log in the user after registration
  app.post('/signup', 
    userController.validateRegister,
    passport.authenticate('local-signup', {
      failureRedirect: '/error',
      successRedirect: '/'
    })
  );

  app.get('/logout', authController.logout);

  app.get('/',
    authController.isLoggedIn,
    userController.protected);

};
