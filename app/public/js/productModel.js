$('#grid').on("click", '.grid-item', function() {
	$.ajax({
		type: "GET",
		url: "/modal/send/" + $(this).attr("data-id")
	}).done(data => {
		renderModal(data)
	})
})


function renderModal(data) {
	$('#contentContainer').empty()
	$('#background').css('display', 'block')
	var source   = document.getElementById("entry-template").innerHTML;
	var template = Handlebars.compile(source);
	var context = data
	var html    = template(context);
	$('#contentContainer').append(html)
}

$('.closeModal').on("click", function() {
	$('#background').css('display', 'none')
})