var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var Entry = mongoose.model('Entry');

router.route('/entries')

	.post(function(req, res){
		var data = req.body;

		var newEntry = new Entry();
		newEntry.image = data.headerImage;
		newEntry.title = data.entryTitle;

		var textList = data.entryText.split(/\n\r?/g);
		var paragraphs = [];
		for (i=0; i<textList.length; i++){
			var obj = {};
			obj.paragraph = textList[i];
			paragraphs.push(obj);
		}
		
		newEntry.text = paragraphs;
		
		var d = new Date;
		d = ''+ d.getMonth() +'-'+ d.getDate() +'-'+ d.getFullYear();
		newEntry.date = d;
		newEntry.save(function(err){
			if (err) {
				throw err;
			}
		});
	})

	.get(function(req, res){
		Entry.find(function(err, entries){
			if (err) return res.send(500, err);
			return res.send(200, entries);
		});
	})

router.route('/entries/:id')
	.get(function(req, res){
		Entry.findById(req.params.id, function(err, entry){
			if(err)
				res.send(err);
			res.json(entry);
		});
	}) 

	.delete(function(req, res){
		Entry.remove({
			_id: req.params.id
		}, function(err){
			if (err) res.send(err);
			res.json("deleted");
		});
	})



router.post('/email', function(req, res){
	var email = req.body;
	console.log(req.body);
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