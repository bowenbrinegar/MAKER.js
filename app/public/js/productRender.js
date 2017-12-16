// fetches from apiRoutes

getProducts()

function getProducts() {
	$.ajax({
		method: "GET",
		url: "/market/send"
	}).done(function(data) {
	  renderCards(data)
	});
}

// initalize masonry

$('#grid').masonry({
  itemSelector: '.grid-item',
 	columnWidth: 200,
});


// doug product cards
// render products
function renderCards(data) {
	for (var i=0; i < data.length; i++) {
		var text = $(`<h1>${data[i].product}</h1>`)
		var slideU = $("<div id='slideUp'>").append(text)
		var pBox = $('<div>').addClass("productBox").append(slideU)
		var item = $(`<div data-id='${data[i].id}'>`).addClass("grid-item").append(pBox)
		$('#grid').prepend( item )
		$('#grid').masonry( 'prepended', item  );
	}
}

