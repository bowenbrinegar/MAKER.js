
$('#commentInput').on('submit', function (evt) {
  evt.preventDefault()
  let data =	{
    ProductId: $('#identifier').attr('data-id'),
    comment: $('#commentInput input').val()
  }
  $.ajax({
    url: '/comment-post',
    type: 'POST',
    data: data
  }).done(data => {
    fetchComments()
    getFlipStats()
  })
  $('#commentInput input').val('')
})

function fetchComments () {
  $.ajax({
    url: '/comment-get/' + $('#identifier').attr('data-id'),
    type: 'GET'
  }).done(data => {
    renderComments(data)
    $('.commentStat').text(data.length)
  })
}

function renderComments (data) {
  console.log(data)
  $('#comments').empty()
  for (var i = 0; i < data.length; i++) {
    var html = `<div>
					<h5 class='username'>${data[i].User.name}</h5>
					<h3 class='commentLoad'>${data[i].comment}</h3>
					<button id='commentLike' data-id='${data[i].id}'>like</button>
					<h4 id="likeTally">${data[i].like}</h4>
				</div>`
    $('#comments').prepend(html)
  }
}

$('#comments').on('click', 'button', function () {
  let obj = { commentId: $(this).attr('data-id') }
  $.ajax({
    url: '/comment-like',
    type: 'PUT',
    data: obj
  }).done(data => {
    fetchComments()
  })
})


