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
});