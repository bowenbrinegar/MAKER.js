
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = (app, passport) => {

  app.get('/login-needed', function(req,res){
    res.send(req.user);
  })
 
  // app.get('/login', userController.loginForm);
  app.post('/login',
    passport.authenticate('login', {
      failureRedirect: '/',
      successRedirect: '/'
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
      successRedirect: '/'
    })
  );

  app.get('/logout', authController.logout);




};
