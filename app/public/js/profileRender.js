
function getData(callback, second) {
	$.ajax({
		url: '/getStats',
		type: 'GET',
		success: callback
	})
	$.ajax({
		url: '/comment-stats',
		type: 'GET',
		success: second
	})
}

getData(function(data) {
	var likeARR = [];
	var collabARR = [];
	for (var i=0; i < data.length; i++) {
		likeARR.push(data[i].like);
		collabARR.push(data[i].collab);
	};		
	function add(a, b) {
	    return a + b;
	};

	var html = `<h1># of Products, ${data.length}</h1>
				<h1># of Likes, ${likeARR.reduce(add, 0)}</h1>
				<h1># of Collaborations, ${collabARR.reduce(add, 0)}</h1>`

				$('#profileStats').append(html)
}, function(data) {
	var html = `<h1># of Comments, ${data.length}</h1>`

				$('#profileStats').append(html)
})

