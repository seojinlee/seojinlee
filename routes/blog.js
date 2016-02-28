var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Entry = mongoose.model('Entry');


module.exports = function(passport){

	var essPartials = {
		head: 'block/blog/head.html',
		navbar: 'block/blog/navbar.html',
		footer: 'block/blog/footer.html'
	};

	router.get('/', function(req, res){
		Entry.find(function (err, entries){
			if (err) return res.send(500, err);
			res.render('blog/blog', {
				partials: essPartials,
				entryPreview: entries.reverse(),
			});
		});
	});
	// router.get('/entry/2015-11-5', function(req, res){
	// 	res.render('blog/entry', {partials: essPartials});
	// });

	router.get('/entry/:id', function(req, res){
		Entry.findById(req.params.id, function(err, entry){
			if(err)
				res.send(err);
			res.render('blog/entry', {
				partials: essPartials,
				entryContent: entry
			});
		});
	});

	//Admin
	router.get('/login', function(req, res){
		res.render('blog/login', {partials: essPartials});
	});

	router.post('/login', passport.authenticate('login'), function(req, res){
		res.redirect('/admin');
	});

	router.get('/admin', function(req, res){
		res.render('blog/admin', {
			partials: essPartials,
			isAuthenticated: req.isAuthenticated(),
			user: req.user['username']
		});
	});

	return router;
};