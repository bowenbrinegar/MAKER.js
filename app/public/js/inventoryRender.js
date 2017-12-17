


getProducts()

function getProducts() {
	$.ajax({
		method: "GET",
		url: "/market/send"
	}).done(function(data) {
	  render(data)
	});
};


function render(data) {
	$('tbody').empty()
	for (var i=0; i < data.length; i++) {

		$('tbody').prepend(`<tr>
													<td data-id='${data[i].id}'' contenteditable="true"></td>
													<td contenteditable="true"></td>
													<td contenteditable="true"></td>
													<td contenteditable="true"></td>
													<td>
														<span class='glyphicon glyphicon-plus'></span>
									        </td>
									        <td>
									        	<span class='glyphicon glyphicon-remove'></span>
									        </td>
												</tr>`);  

      var firstRowTds = $("table")
        .children()
        .eq(1)
        .children("tr")
        .eq(0)
        .children("td");

      firstRowTds.eq(0).text(data[i].product);
      firstRowTds.eq(1).text(data[i].description);
      firstRowTds.eq(2).text(data[i].price);
      firstRowTds.eq(3).text(data[i].cost);
	};
};


//on table change, grabs text content from inventory contenteditale td from tr
//pushes content into array

$(document).ready(function() {
	$(document).on("click", ".glyphicon-plus", function() {
		var arr = [];
		var temp = $(this).parent("td").parent("tr").children("td");
		for (var i=0; i < temp.length - 1; i++) {
			arr.push(temp[i].textContent);
		}
		arr.push(temp.eq(0).attr("data-id"))
		var partsARR = arr[1].split(",")
		var obj = {
			product: arr[0],
			parts: partsARR,
			price: arr[2],
			cost: arr[3],
			id: arr[5]
		}
		$.ajax({
			method: "PUT",
			url: "/inventory/update",
			data: obj
		}).done()

		window.location.replace("/inventory");
	})

	$(document).on("click", ".glyphicon-remove", function() {
		var temp = $(this).parent("td").parent("tr").children("td");
		let obj = { id: temp.eq(0).attr("data-id") }
		$.ajax({
			method: "DELETE",
			url: "/inventory/delete/row",
			data: obj
		}).done()

		window.location.replace("/inventory");
	});
});


