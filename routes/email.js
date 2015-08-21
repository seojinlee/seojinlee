var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
router.post('/', function(req, res){
	var email = req.body;
	var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'leeseojin0404@gmail.com',
		pass: 'grey833t'
		}
	});

	var mailOptions = {
		from: email.email,
		to: 'leeseojin0404@gmail.com',
		subject: email.subject,
		text: email.message	
	}

	transporter.sendMail(mailOptions, function(err, info){
		if(err) console.log(err);
	});

});



module.exports = router;