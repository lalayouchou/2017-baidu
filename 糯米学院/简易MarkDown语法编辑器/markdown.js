
(function($) {
	var text={
		'h1':/^#\s$/,
		'h2':/^#{2}\s$/,
		'h3':/^#{3}\s$/,
		'h4':/^#{4}\s$/,
		'h5':/^#{5}\s$/,
		'h6':/^#{6}\s$/,
	}

	var textarea=$('#eidt'),
		perview=$('#perview');
	textarea.on('keydown', function(event) {
		var html=$(this).val();
		console.log(event.key);
	});



})(jQuery);