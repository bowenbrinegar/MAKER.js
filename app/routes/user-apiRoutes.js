
const userController = require('../controllers/userController');

module.exports = app => {

  app.get('/login', userController.loginForm);

};
