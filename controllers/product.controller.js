var db = require('../db')

module.exports.index = (req, res) => {
	var currentPage = parseInt(req.query.page) || 1
	var perPage = 3
	var totalPages = parseInt(db.get('products').value().length/perPage)
	var start = (currentPage - 1) * perPage
	var end = currentPage * perPage
	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		pageInfo: {
			currentPage: currentPage,
			totalPages: totalPages
		}
	})
}
