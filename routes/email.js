var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
router.post('/', function(req, res){
	var email = req.body;
	var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'email',
		pass: 'password'
		}
	});

	var mailOptions = {
		from: email.email,
		to: 'email',
		subject: email.subject,
		text: email.message	
	}

	transporter.sendMail(mailOptions, function(err, info){
		if(err) console.log(err);
	});

});



module.exports = router;