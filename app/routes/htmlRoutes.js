var path = require("path");
var authController = require('../controllers/authController');

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get('/market', function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/market.html"))
  })

  app.get("/form", authController.isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form.html"));
  });

  app.get("/inventory", authController.isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });
};