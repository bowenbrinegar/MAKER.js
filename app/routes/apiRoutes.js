var db = require('./../models')

module.exports = function (app) {
  app.get('/getStats', function (req, res) {
    db.Products.findAll({where: {UserId: req.user.id}
    }).then(data => {
      res.send(data)
    })
  })

  app.get('/comment-stats', function (req, res) {
    db.Comments.findAll({where: {UserId: req.user.id}
    }).then(data => {
      res.send(data)
    })
  })

  app.get('/p-like-collab/:id', function (req, res) {
    db.Products.findOne({
        where: {id: req.params.id},
		include: db.Purchases
    }).then(data => {
      res.send(data)
    })
  })


  app.get('/modal/send/:id', function (req, res) {
    db.Products.findOne({
      where: {id: req.params.id}
    }).then(data => {
      res.send(data.dataValues)
    })
  })

  app.get('/market/send', function (req, res) {
    console.log('market loading')
    db.Products.findAll().then(data => {
      res.send(data)
    })
  })

  app.get('/inventory-send', function (req, res) {
    db.Products.findAll(
      {where: {UserId: req.user.id}
      }).then(data => {
      res.send(data)
    })
  })

  app.get('/purchase-send', function (req, res) {
    var arr = []
    db.Purchases.findAll({
      where: {UserId: req.user.id},
      include: db.Products
    }).then(data => {
      console.log(data)
      res.send(data)
    })
  })

  app.put('/add-collab', function (req, res) {
    db.Products.increment('collab', {where: {id: req.body.id}}).then(data => {
      res.send("success")
    })
  })

  app.put('/add-like', function (req, res) {
    db.Products.increment('like', {where: {id: req.body.id}}).then(data => {
      res.send("success")
    })
  })

  app.post('/add-purchase', function (req, res) {
    db.Purchases.create({
      ProductId: req.body.id,
      UserId: req.user.id
    }).then(data => {
      res.send("success")
    })
  })

  app.post('/comment-post', function (req, res) {
    console.log('post working')
    db.Comments.create({
      comment: req.body.comment,
      like: 0,
      ProductId: req.body.ProductId,
      UserId: req.user.id
    }).then(data => {
      res.send('success')
    })
  })

  app.get('/comment-get/:pid', function (req, res) {
    db.Comments.findAll({
      where: { ProductId: req.params.pid},
      include: db.Users
    }).then(data => {
      console.log(data)
      res.send(data)
    })
  })

  app.put('/comment-like', function (req, res) {
    db.Comments.increment('like', {where: {id: req.body.commentId}}).then(data => {
      res.send("success")
    })
  })

  app.post('/submit/project', function (req, res) {
    console.log('project submitted')
    console.log(req.user)
    if (req.user == undefined) {
      console.log('undefined')
      res.send('0')
    } else {
      db.Products.create({
        product: req.body.product,
        parts: {parts: req.body.parts},
        price: req.body.price,
        cost: req.body.cost,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        UserId: req.user.id
      }).then(function (item) {
        console.log('project created')
        res.send('1')
      }).catch(err => {
        res.send('2')
      })
    }
  })

  app.put('/inventory/update', function (req, res) {
    console.log(req.body)
    db.Products.update({
      product: req.body.product,
      parts: {parts: req.body.parts},
      price: req.body.price,
      cost: req.body.cost },
    { where: {id: req.body.id} }
    ).then(data => {
      res.send("success")
    })
  })

  app.delete('/inventory/delete/row', function (req, res) {
    db.Products.destroy({
      where: {id: req.body.id }
    }).then(data => {
      res.send("success")
    })
  })
}
