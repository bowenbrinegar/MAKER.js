

  $('.modalButtonBox').on('click', 'button', function () {
    let val = $(this).attr('value');
    let id = { id: $('#identifier').attr('data-id') }
    if (val == 0) { collab(id, getFlipStats()) } else if (val == 1) { like(id, getFlipStats()) } else if (val == 2) { purchase(id, getFlipStats()) }
  })

  function collab (id, callback) {
    $.ajax({
      type: 'PUT',
      url: '/add-collab',
      data: id,
        success: callback
    })
  }

  function like (id, callback) {
    $.ajax({
      type: 'PUT',
      url: '/add-like',
      data: id,
        success: callback
    })
  }

  function purchase (id, callback) {
    $.ajax({
      type: 'POST',
      url: '/add-purchase',
      data: id,
        success: callback
    })

  }

