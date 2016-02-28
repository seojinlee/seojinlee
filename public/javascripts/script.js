$(document).ready(function(){
	console.log('blog javascript');
	var $window = $(window);
	var $main = $('.main');
	var $entriesContainer = $('.entries-container');
	var $navbar = $('.navbar');
	var $nav = $('nav');

	if (window.location.pathname == '/') $navbar.find('.backdrop').css({opacity: '0.2', backgroundColor: '#ffffff'});
	var scrollHeight = window.scrollY;

	function scrollHeader(e){
		var scrollHeightNew = window.scrollY;
		var navbarHeight = parseInt($navbar.css('height'));
		var navbarTop = parseInt($navbar.css('top'));

		if (scrollHeightNew > scrollHeight) {
			console.log(navbarTop+(scrollHeight-scrollHeightNew));
			$navbar.css('top', navbarTop+(scrollHeight-scrollHeightNew)+'px');
		}
		else {
			var navbarTopNew = navbarTop+(scrollHeight-scrollHeightNew);
			if (navbarTopNew < -navbarHeight){
				$navbar.css('top', -navbarHeight +'px');
			}
			else if (navbarTopNew > -1){
				$navbar.css('top', '-1px');
			}
			else {
				$navbar.css('top', navbarTop+(scrollHeight-scrollHeightNew)+'px');
			}
		}
		scrollHeight = scrollHeightNew;
	}
	window.addEventListener('scroll', scrollHeader);
	$('.fadeIn').fadeIn();
})
$('.fadeIn').hide();

$(document).ready(function(){
	var $window = $(window);
	var $main = $('.main');
	var $header = $('.header');
	var $headerText = $('.header-text');
	var $navbar = $('.navbar');
	var $nav = $('nav');
	

////////// Parallex header scrolling & navbar scrolling ////////////

	if (['/','/home'].indexOf(window.location.pathname) > -1){
		$navbar.find('.backdrop').css({opacity: '0.2', backgroundColor: '#ffffff'});

		function scrollHeader(e){
			var scrollHeight = window.scrollY;
			var mainTop = parseInt($main.css('margin-top'))
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
		$('.fadeIn').fadeIn();
	}
	else $('.fadeIn').fadeIn();

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
					url: "/api/email",
					data: mailData,
					success: function(){
						alert("Message sent!");
					}
				});
			}
			else alert("One of the inputs are empty! Please fill in completely.")
		});
	}

	window.onbeforeunload = function (){
		
	}
});
$(document).ready(function(){
	var entry = {
		headerImage: null,
		entryText: null,
		entryTitle: null,
	}

	$('input[value="Submit"]').on('click', save);

	function save(){
		update(null, $('input[name="content"]').val(), $('textarea').val());

		$.ajax({
			type: "POST",
			url: "/api/entries",
			data: entry,
			success: function(){
				alert("Entry saved!");
			}
		});
	}

	$('.drop-image')
		.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css({opacity:'0.6'});

		})
		.on('dragleave', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css({opacity:'1'});
		})
		.on('drop', function(e) {
			e.stopPropagation();
		    e.preventDefault();
			$(this).css({opacity:'1'});
			handleDrop(e);
		});


	function handleDrop(e){
		var data = e.originalEvent.dataTransfer;
		var URL;
		// Handle as a file
		if (data.files[0]){
			var file = data.files[0];
			var name = file.name;
			var type = file.type;
			var size = file.size;
			var reader = new FileReader();
			reader.onload = function(f){
				URL = f.target.result;
			}
			//console.log(file);
			reader.readAsDataURL(file);
		}
		// Handle as a URL
		else {
			URL = data.getData('URL');
		}
		update(URL, null, null);
	}

	function update(url, title, text){
		if (url){
			entry.headerImage = url;
			console.log(url);
			$('.drop-image').css('backgroundImage', 'url('+url+')');
		}
		if (text){
			entry.entryText = text;
		}
		if (title){
			entry.entryTitle = title;
		}
	}
});