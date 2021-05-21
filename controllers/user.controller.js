var db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	})
}

module.exports.search = (req, res) => {
	var q = req.query.q
	var matchesUsers = db.get('users').value().filter(function(user) {
		return user.name.indexOf(q) !== -1
	})
	res.render('users/index', {
		users: matchesUsers
	})
}

module.exports.create = (req, res) => {
	res.render('users/create')
}


module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate()
	

	db.get('users').push(req.body).write()
	res.redirect('/users')
}

module.exports.get = (req, res) => {
	var id = req.params.id
	var user = db.get('users').find({ id: id}).value()
	res.render('users/view', {
		user: user
	})
}