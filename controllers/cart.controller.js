var db = require('../db')

module.exports.add = (req, res) => {
	var productId = req.params.id 
	var sessionId = req.signedCookies.sessionId

	if (!sessionId) {
		res.redirect('/products')
		return
	}

	var session = db.get('session').find({ id: sessionId})

	var count = session.get('cart.' + productId, 0)

	session.set('cart.' + productId, count + 1).write()

	var products = session.get('cart').value()
	var total = 0
	for (var id in products) {
		total += parseInt(products[id])
	}

	session.set('total', total).write()

	res.redirect('/products')
}
