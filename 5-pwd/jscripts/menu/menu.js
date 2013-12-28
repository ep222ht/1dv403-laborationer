$(document).ready(
		function () {
		    $('#desktop').Fisheye(
				{
				    maxWidth: 50,
				    items: 'a',
				    itemsText: 'span',
				    container: '.desklank',
				    itemWidth: 60,
				    proximity: 90,
				    halign: 'center'
				}
			)
		}
	);