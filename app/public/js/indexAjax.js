// load creators in select options if creators exist

getCreators()

function getCreators() {
  $.ajax("/creators", {
  	type: "GET"
  }).then( data => {
  	if (data.length !== 0) {
  	renderCreatorList(data)
  	}
  });
}

var creatorSelect = $("#creator");
var authorId;

function renderCreatorList(data) {
  if (!data.length) {
    window.location.href = "/";
  }
  $(".hidden").removeClass("hidden");
  var rowsToAdd = [];
  for (var i = 0; i < data.length; i++) {
    rowsToAdd.push(createRow(data[i]));
  }
  creatorSelect.empty();
  creatorSelect.append(rowsToAdd);
  creatorSelect.val(authorId)
}

function createRow(author) {
  var listOption = $("<option>");
  listOption.attr("value", author.id);
  listOption.text(author.name);
  return listOption;
}


// input creator

$('#creatorSubmit').on("click", function() {
	console.log("working")
	var temp = $('#inputer').val().trim()
	$('#inputer').val("")
	 $.ajax("/submit-creator", {
      type: "POST",
      data: {name: temp}
   }).then(); 
	getCreators()
})


// grabs selected creator (userid) from options, calls ajax which sets ID as a standard
// this area needs work, possibly creating a Legend Table that says (user x) is currently (using) the platform

$('#creatorSelect').on("click", function() {
	let temp = {id: $('#creator').val().trim()}
	$.ajax({
    type: "POST",
    url: "/send-id",
    data: temp
  });
})


