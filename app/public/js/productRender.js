// fetches from apiRoutes
$('#logOut').on('click', function () {
  window.location.assign('/logout')
})

getProducts()

function getProducts () {
  $.ajax({
    method: 'GET',
    url: '/market/send'
  }).done(function (data) {
	  renderCards(data)
  })
}

// initalize masonry

$('#grid').masonry({
  itemSelector: '.grid-item',
 	columnWidth: 200,
})

// doug product cards
// render products
function renderCards (data) {
  for (var i = 0; i < data.length; i++) {
    var html = `<div class='grid-item' data-id='${data[i].id}'>
									<div class='productBox'>
										<img class='pImg' src='${data[i].imgUrl}'>
										<div id='slide'>
											<h1>${data[i].product}</h1>
										</div>
									</div>
								</div>`

    $('#grid').prepend(html)
    $('#grid').masonry('prepended', html)
  }
}
