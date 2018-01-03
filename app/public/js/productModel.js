$('#grid').on('click', '.grid-item', function () {
  $.ajax({
    type: 'GET',
    url: '/modal/send/' + $(this).attr('data-id')
  }).done(data => {
    renderModal(data)
  })
})

function getFlipStats () {
  $.ajax({
    url: '/p-like-collab/' + $('#identifier').attr('data-id'),
    type: 'GET'
  }).done(data => {
  	  $('.likeStat').text(data.like)
	  $('.collabStat').text(data.collab)
    $('.purchaseStat').text(data.Purchases.length)
  })
}

var turn = true
function renderModal (data) {
  $('#contentContainer').empty()
  $('#productModal').css('display', 'block')
  $('#chatModal').css('display', 'block')
  $('#comments').empty()
  var source = document.getElementById('entry-template').innerHTML
  var template = Handlebars.compile(source)
  var context = data
  var html = template(context)
  $('#contentContainer').append(html)
  fetchComments()
  getFlipStats()
  if (turn) {
    animatePage()
    turn = !turn
  }
}

$('.closeModal').on('click', function () {
  $('#productModal').css('display', 'none')
  $('#chatModal').css('display', 'none')
  $('#gridContainer').animate({
    'left': '50%',
    'width': '700px'
  })
  $('#grid').animate({
    'width': '800px'
  })
  $('.grid-item').animate({
    'width': '40%'
  })
  turn = !turn
})

function animatePage () {
  $('#gridContainer').animate({
    'left': '370px',
    'width': '350px'
  })
  $('#grid').animate({
    'width': '400px'
  })
  $('.grid-item').animate({
    'width': '80%'
  })
}
