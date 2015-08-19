$(document).ready(function(){
	var $header = $('div.header');
	var $headerText = $('div.headerText');
	var $navbar = $('div.navbar');
	var $nav = $('nav');

	function scrollHeader(e){
		var scrollHeight = window.scrollY;
		var headerHeight = 578;
		if (scrollHeight > headerHeight){
			$navbar.css('backgroundColor', '#4aa3df');
			$navbar.css('top', headerHeight-scrollHeight+'px');
		}
		else {
			var parallexRatio = 0.8;
			var headerPos = -460;
			var newPos = headerPos + scrollHeight*parallexRatio;
			$header.css('backgroundPosition', '50% '+newPos+'px');
			$headerText.css('')
			$navbar.css('backgroundColor', 'initial');
			$navbar.css('top', '0px');
		}
	}

	window.addEventListener('scroll', scrollHeader);
})