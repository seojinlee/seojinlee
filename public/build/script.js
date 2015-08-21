$('.fadeIn').hide();

$(document).ready(function(){
	var $window = $(window);
	var $main = $('.main');
	var $header = $('.header');
	var $headerText = $('.header-text');
	var $navbar = $('.navbar');
	var $nav = $('nav');
	
	$('.fadeIn').fadeIn();

////////// Parallex header scrolling & navbar scrolling ////////////

	if (['/','/home'].indexOf(window.location.pathname) > -1){
		$navbar.find('.backdrop').css({opacity: '0.2', backgroundColor: '#ffffff'});

		function scrollHeader(e){
			var scrollHeight = window.scrollY;
			var mainTop = parseInt($main.css('top'))
			var headerHeight = mainTop-parseInt($navbar.css('height'));
			if (scrollHeight < mainTop) {
				var parallexRatio = 0.2;
				$headerText.css('top', -scrollHeight*parallexRatio);
				$navbar.css('backgroundColor', 'initial');
				
				if (scrollHeight > headerHeight){
					$navbar.css('top', headerHeight-scrollHeight+'px');
				}
				else $navbar.css('top', '0px');
			}
			else {
				$navbar.css('top', '9999px');
			}
		}
		window.addEventListener('scroll', scrollHeader);
	}

	if('/contact' === window.location.pathname){
		var $info = $('.info');
		var mailData = new Object;

		$info.on('click', 'button', function(){
			mailData.name = $info.find('#name').val();
			mailData.subject = $info.find('#subject').val();
			mailData.message = $info.find('#message').val();
			mailData.email = $info.find('#email').val();
			console.log(mailData);

			var tag = mailData.name+': '+mailData.email;
			mailData.subject = mailData.subject+' [ '+tag+' ]';
			mailData.message = mailData.message+'\n\n'+tag;

			var empty = false;
			for (i in mailData){
				if (!mailData[i]) empty = true;
			}

			if (!empty){
				$.ajax({
					type: "POST",
					url: "/send-mail",
					data: mailData,
					success: function(){
						alert("Message sent!");
					}
				});
				alert("Message sent!");
			}
			else alert("One of the inputs are empty! Please fill in completely.")
		});
	}
});