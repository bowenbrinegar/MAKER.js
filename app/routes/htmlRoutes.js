var path = require("path");
const authController = require('../controllers/authController');

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
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

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};