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
			$(this).data("data-selected", false)
			console.log($(this).data())
			for(var i=0; i < partsARR.length; i++) {
				if (partsARR[i] === $(this).attr('data-tool')) {
					partsARR.splice(i, 1);
				} 
			}
			nextValidator()
			return
		} 

		$(this).data("data-selected", true)
		console.log($(this).data())
		$(this).children().eq(1).toggle();
		partsARR.push($(this).attr('data-tool'))
		nextValidator()
	});


	function nextValidator() {
		let count = 0;
		let temp = $('#partsGrid').children()
		for (var i=0; i < temp.length; i++) {
			if (temp.eq([i]).data().dataSelected == true) {
				count++;
				if (count > 4) {
					$('#next').show()
				} else {
					$('#next').hide()
				}
			}
		}
	}


	$('#surveyElement').hide()
	$('#previous').hide()
	$('#next').hide()

	$('#next').on("click", function() {
		$('#partsGrid').hide()
		$('#next').hide()
		$('#surveyElement').show()
		$('#previous').show()
	})

	$('#previous').on("click", function() {
		$('#partsGrid').show()
		$('#next').show()
		$('#surveyElement').hide()
		$('#previous').hide()
	})

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "completeButton";

var json = {
    pages: [
        { questions: [ 
            { type:"text", name:"object", title: "What do you want to make?", placeHolder:"Be creative", isRequired: true},
            { type: "comment", name: "description", title: "Add a description", placeHolder: "Be Creative", isRequired: true},
            { type:"text", name:"price", title: "How much will you sell it for?", placeHolder:"Be creative", isRequired: true},
            { type:"text", name:"cost", title: "How much will it cost you to make", placeHolder:"Be creative", isRequired: true} 
        ]}
    ]
};

	window.survey = new Survey.Model(json);

	survey.onComplete.add(function(data) {
			var obj = {
				product: data.valuesHash.object,
				description: data.valuesHash.description,
				parts: partsARR,
				price: data.valuesHash.price,
				cost: data.valuesHash.cost
			}

	    $.ajax("/submit/project", {
	      type: "POST",
	      data: obj
	    }).then(); 
	    window.location.replace("/market");
	});

	$('#surveyElement').Survey({ 
	    model: survey
	});

})


