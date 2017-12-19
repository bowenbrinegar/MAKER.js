var db = require("./../models");

module.exports = function(app, passport) {

	app.get('/getStats', function(req, res) {
		db.Products.findAll({where: {UserId: req.user.id}
		}).then(data => {
			res.send(data);
		});
	});

	app.get('/comment-stats', function(req, res) {
		db.Comments.findAll({where: {UserId: req.user.id}
		}).then(data => {
			res.send(data)
		});
	})

	app.get('/modal/send/:id', function(req, res) {
		db.Products.findOne({ 
			where: {id: req.params.id} 
		}).then(data => {
			res.send(data.dataValues)
		});
	});

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
		}).then(data => {
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
		}).then(data => {
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

	app.post('/comment-post', function(req, res) {
		console.log("post working")
		db.Comments.create({
			comment: req.body.comment,
			ProductId: req.body.ProductId,
			UserId: req.user.id
		}).done(data => {
			res.send("success")
		})
	})

	app.get('/comment-get/:pid', function(req, res) {
		db.Comments.findAll({
			where: { ProductId: req.params.pid},
			include: db.Users
		}).done(data => {
			console.log(data)
			res.send(data)
		})
	})

	app.put('/comment-like', function(req, res) {
		var likeCount = 0;
		db.Comments.findOne({ where: {id: req.body.commentId}
		}).done(data => {
			likeCount = data.like;
		})
		db.Comments.update({like: likeCount + 1},
		{where: {id: req.body.commentId}}).done(data => {
			res.send("success")
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