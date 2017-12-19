


$(document).ready(function() {

$('#navContainer').on("click", "div", function() {
	var v = $(this).attr("value")
	console.log("value", v)

	if (v==0) { window.location.assign('/market'); }
	else if (v==1) { window.location.assign('/form'); }
	else if (v==2) { window.location.assign('/inventory'); }
})





$('#infoContainer').hide()
$('.main-carousel').hide()
$('#profileJazz').hide()

var turn = true;
$('#selectProfile').on("click", function() {
	if (turn) {
		$('#profileContainer').animate({"width": "30%"});
		$('#profileJazz').show()
		$('#navContainer').animate({"left": "63%"});
		$('#infoContainer').animate({"left": "63%"});
		$('.main-carousel').animate({"width" : "650px", "left": "63%"})
		$('.homeDirectoryButtons').animate({"width": "450px"});
		turn = !turn;
		return
	}
	$('#profileContainer').animate({"width": "4%"});
	$('#profileJazz').hide()
	$('#navContainer').animate({"left": "50%"});
	$('#infoContainer').animate({"left": "50%"});
	$('.main-carousel').animate({"width" : "800px", "left": "50%"})
	$('.homeDirectoryButtons').animate({"width": "500px"});
	turn = !turn;
})


$('#back').on('click', function() {
	$('#profileContainer').animate({"width": "4%"});
	$('#navContainer').animate({"left": "50%"});
	$('.homeDirectoryButtons').animate({"width": "500px"});
	$('#infoContainer').hide()
	$('#navContainer').show()
})

var count = 0


$('#up').on("click", function() {
	if (count == 1) {
		$('#navContainer').show()
		$('#infoContainer').hide()
		count--;
	}
	else if (count == 2) {
		$('#infoContainer').show()
		$('.main-carousel').hide()
		count--;
	}
	console.log("up", count)
})

$('#down').on("click", function() {
	if (count == 0) {
		$('#navContainer').hide()
		$('#infoContainer').show()
		count++;
	}
	else if (count == 1) {
		$('#infoContainer').hide()
		$('.main-carousel').show()
		count++;
	}
	console.log("down", count)
})

})