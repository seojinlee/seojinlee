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
		var backgroundPosInit = parseInt($header.css('backgroundPositionY'));
		var scrollFactor;

		$navbar.find('.backdrop').css('opacity', '0.2');

		function adjustScrollFactor(e){
			var scrollLength = $(document).height() - $window.height();
			scrollFactor = (100-backgroundPosInit) / scrollLength;
		}
		adjustScrollFactor();

		function scrollHeader(e){
			var scrollHeight = window.scrollY;
			var mainTop = parseInt($main.css('top'))
			var headerHeight = mainTop-parseInt($navbar.css('height'));
			if (scrollHeight < mainTop) {
				var parallexRatio = 0.2;
				var newPos = backgroundPosInit + scrollHeight*scrollFactor;
				$header.css('backgroundPositionY', newPos+'%');
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
		window.addEventListener('resize', adjustScrollFactor);
	}

	$window.on('beforeunload', function(){
		alert('hello');
	});
});