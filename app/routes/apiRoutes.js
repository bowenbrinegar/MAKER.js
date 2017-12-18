var db = require("./../models");

module.exports = function(app, passport) {

	// app.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/loginError'
	// }))

	// app.post('/login', passport.authenticate('local-signin', {
 //        successRedirect: '/',
 //        failureRedirect: '/loginError'
	//     }
	// ));

	// app.get('/logout', function(req, res) {
	// 	req.session.destroy(function(err) {
 //        res.redirect('/');
 //    });
	// })

	app.get('/modal/send/:id', function(req, res) {
		db.Products.findOne({ 
			where: {id: req.params.id} 
		}).then(data => {
			res.send(data.dataValues)
		})
	})

	app.get("/market/send", function(req, res) {
		console.log("market loading")
		db.Products.findAll().then(data => {
			res.send(data)
		});
	});

	app.get("/inventory-send", function(req, res) {
		db.Products.findAll(
			{where: {UserId: req.user.id}
		}).then(data => {
			res.send(data)
		});
	});

	app.get("/purchase-send", function(req, res) {
		var arr = [];
		db.Purchases.findAll({
			where: {UserId: req.user.id},
			include: db.Products
		}).then(data => {
			console.log(data)
			res.send(data)
		});

	});
	
	app.put("/add-collab", function(req,res) {
		db.Products.findOne({
			where: {id: req.body.id}
		}).done(data => {
			let update = data.dataValues.collab + 1;
			console.log(update);
			db.Products.update(
				{ collab: update },
	      { where: {id: req.body.id} }).done(data => {
	      	console.log(data)
	      })
		})
	})

	app.put("/add-like", function(req,res) {
		db.Products.findOne({
			where: {id: req.body.id}
		}).done(data => {
			let update = data.dataValues.like + 1;
			console.log(update);
			db.Products.update(
				{ like: update },
	      { where: {id: req.body.id} }).done(data => {
	      	console.log(data)
	      })
		})

	})

	app.post("/add-purchase", function(req,res) {
		db.Purchases.create({
			ProductId: req.body.id,
			UserId: req.user.id
		})
	})

	app.post("/submit/project", function(req, res) {
		
		console.log("project submitted")
		console.log(req.user)
		if (req.user == undefined) {
			console.log("undefined")
			res.send("0");
			return
		} else {
			db.Products.create({
				product: req.body.product,
				parts: {parts: req.body.parts},
				price: req.body.price,
				cost: req.body.cost,
				description: req.body.description,
				imgUrl: req.body.imgUrl,
				UserId: req.user.id
			}).then(function(item) {
				console.log("project created")
				res.send("1");
			}).catch(err => {
				res.send("2");
			});
		}	
	});

	app.put("/inventory/update", function(req, res) {
		console.log(req.body)
		db.Products.update({ 
			product: req.body.product,
			parts: {parts: req.body.parts},
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