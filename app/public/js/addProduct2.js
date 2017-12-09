$('#partsGrid').masonry({
  itemSelector: '.parts-item',
 	columnWidth: 20,
});

partsARR = [];

var color = function() {
	let arr = ['DarkMagenta', 'DeepSkyBlue', 'DarkGrey', 'DarkGoldenRod', 
	'DarkSalmon', 'SpringGreen', 'FireBrick', 'Orchid', 'BlueViolet',
	'Indigo', 'DarkViolet', 'Sienna', 'DarkCyan', 'Fuchsia', 'SeaGreen',
	'SaddleBrown', 'DarkTurquoise', 'Green', 'MidnightBlue']
	return arr[Math.floor(Math.random() * arr.length)]
}

$(document).ready(function() {
	function renderToolBox() {
		let arr = ['3d-Printer', 'Hammer', 'Screwdiver', 'Nails', 
		'Computer', 'Wires', 'Metal', 'Cardboard', 'Fire', 'Tubing',
		'Ice Pick', 'Div', 'Def', 'Span', 'Coding', 'More Fire', 'Skis',
		'Boat', 'Jazz', 'Other', 'Create', 'Make', 'Ect', 'One more']

		for (var i=0; i < arr.length; i++) {
			var text = $(`<span>${arr[i]}</span>`);
			var check = $(`<div>`).addClass("check").append(text).append(`<span class="glyphicon glyphicon-ok"></span>`)
			var box = $(`<div data-tool="${arr[i]}">`).addClass("parts-item").css("background", color()).append(text).append(check)
			$('#partsGrid').append( box )
			$('#partsGrid').masonry( 'appended', box );
		}
	}

	renderToolBox()

	$('.parts-item').on("click", function() {
		if ($(this).children().eq(1).css("display") == "block") {
			$(this).children().eq(1).toggle();
			for(var i=0; i < partsARR.length; i++) {
				if (partsARR[i] === $(this).attr('data-tool')) {
					partsARR.splice(i, 1);
				} 
			}
			return
		} 

		$(this).children().eq(1).toggle();
		partsARR.push($(this).attr('data-tool'))
	});


	$('#builder').on('submit', function(evt) {
		evt.preventDefault();
		console.log('working')
		var obj = {
			product: $(this).children().eq(0).val(),
			parts: partsARR,
			price: $(this).children().eq(1).val(),
			cost: $(this).children().eq(2).val()
		}

		$.ajax("/submit/project", {
      type: "POST",
      data: obj
    }).then(); 
    window.location.replace("/market");

	});
})


