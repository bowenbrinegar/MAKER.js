$(document).ready(function () {
  $('.modalButtonBox').on('click', 'button', function () {
    var val = $(this).attr('value')
    var id = { id: $('#identifier').attr('data-id') }
    if (val == 0) { collab(id) } else if (val == 1) { like(id) } else if (val == 2) { purchase(id) }
  })

  function collab (id) {
    $.ajax({
      type: 'PUT',
      url: '/add-collab',
      data: id
    }).done(data => {
      console.log('collab success')
    })
    getFlipStats()
  }

  function like (id) {
    $.ajax({
      type: 'PUT',
      url: '/add-like',
      data: id
    }).done(data => {
      console.log('like success')
    })
    getFlipStats()
  }

  function purchase (id) {
    $.ajax({
      type: 'POST',
      url: '/add-purchase',
      data: id
    })
    getFlipStats()
  }
})
