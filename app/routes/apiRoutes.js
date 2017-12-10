var db = require("./../models");
var userID;


module.exports = function(app) {
	

	app.get("/market/send", function(req, res) {
		db.Products.findAll().then(data => {
			res.send(data)
		});
	});

	app.get("/creators", function(req, res) {
		db.Users.findAll().then(data => {
			res.send(data)
		});
	});

	app.post("/send-id", (req, res) => {
		userID = req.body;
		console.log(userID)
	})

	app.post("/submit-creator", function(req, res) {
		console.log(req.body)
		db.Users.create({
			name: req.body.name
		})
	})

	app.post("/submit/project", function(req, res) {
		console.log(req.body)
		db.Products.create({
			product: req.body.product,
			parts: {parts: req.body.parts},
			price: req.body.price,
			cost: req.body.cost,
			description: req.body.description
		});

		res.status(200).end();
	});

	app.put("/inventory/update", function(req, res) {
		db.Products.update({ 
			product: req.body.product,
			description: req.body.description,
			price: req.body.price,
			cost: req.body.cost },
      { where: {id: req.body.id} }
    ).then(res);
		
	});

	app.delete("/inventory/delete/row", function(req, res) {
		db.Products.destroy({
			where: {id: req.body.id }
		});
	});
};