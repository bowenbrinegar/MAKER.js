var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get('/market', function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/market.html"))
  })

  app.get("/form", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form.html"));
  });

  app.get("/inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });
};