

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

	console.log("product #", data.length) 
	// console.log("# of comments", comments)
	console.log(likeARR.reduce(add, 0), collabARR.reduce(add, 0))
}, function(data) {
	console.log("comments", data.length)
})




	


	