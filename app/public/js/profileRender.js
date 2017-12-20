
function getData (callback, second) {
  $.ajax({
    url: '/getStats',
    type: 'GET',
    success: callback
  });
  $.ajax({
    url: '/comment-stats',
    type: 'GET',
    success: second
  })
}

getData(function (data) {
  let likeARR = [];
  let collabARR = [];
  for (let i = 0; i < data.length; i++) {
    likeARR.push(data[i].like)
    collabARR.push(data[i].collab)
  }
  function add (a, b) {
    return a + b
  }

  $('.profProd').text(data.length)
  $('.profLike').text(likeARR.reduce(add, 0))
  $('.profCol').text(collabARR.reduce(add, 0))

}, function (data) {
  $('.profCom').text(data.length)
});
