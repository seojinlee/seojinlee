var express = require('express');
var router = express.Router();

var essPartials = {
	head: 'block/head.html',
	navbar: 'block/navbar.html',
	footer: 'block/footer.html'
};

router.get(['/','/home'], function(req, res){
	res.render('index', {partials: essPartials});
});

router.get('/aboutme', function(req, res){
	res.render('aboutme', {partials: essPartials});
});

router.get('/engineering', function(req, res){
	res.render('engineering', {partials: essPartials});
});

router.get('/webdev', function(req, res){
	res.render('webdev', {partials: essPartials});
});

router.get('/contact', function(req, res){
	res.render('contact', {partials: essPartials});
});

module.exports = router;