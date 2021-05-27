var db = require('../db')

module.exports.index = (req, res) => {
	var currentPage = parseInt(req.query.page) || 1
	var perPage = 3
	var totalPages = parseInt(db.get('products').value().length/perPage)
	var start = (currentPage - 1) * perPage
	var end = currentPage * perPage
	
	var total = 0
	var sessionId = req.signedCookies.sessionId
	if (sessionId) {
		var session = db.get('session').find({ id: sessionId})
		total = session.get('total')
	}
	
	res.render('products/index', {
		total: total,
		products: db.get('products').value().slice(start, end),
		pageInfo: {
			currentPage: currentPage,
			totalPages: totalPages
		}
	})
}
