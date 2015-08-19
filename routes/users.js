var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('users', {
		title: "Seojin Lee",
		name: "Will"
	});
});

module.exports = router;