function getStats() {
	$.ajax({
		url: '/getStats',
		type: 'GET'
	}).done((obj) => {

		console.log(obj)
	})
}

getStats()