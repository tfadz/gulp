jQuery(function($) {
	
	$('.elm-nav-mobile__pull').click(function(event) {
		$('.elm-nav-mobile__links').toggleClass('elm-nav-mobile__links__show');
		$('.elm-nav-mobile__mask').toggleClass('elm-nav-mobile__mask--show');

	});
});