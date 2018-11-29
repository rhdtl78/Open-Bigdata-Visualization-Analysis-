function derTable() {
	$('#derBtn').empty();
	var variable = new Array();
	$('#summaryTable tr').each(function() {
		variable.push($(this).find("td:first").text())
	})

	variable = variable.slice(1, variable.length)
	variable.forEach(function(element) {
		var btn = $('<button type="button" id=' + element + ' class="btn btn-primary" onclick="btnDer(this.id)">' + element + '</button>');
		$('#derBtn').append(btn);
	});

}

function btnOper(oper) {
	if (oper != "<") {
		var temp = $('#expression').val() + oper;
		$('#expression').val(temp);
	} else {
		var temp = $('#expression').val().slice(0, -1);;
		$('#expression').val(temp);
	}

}

function btnDer(variable) {
	var temp = $('#expression').val() + "`" + variable + "`";
	$('#expression').val(temp);
}

function btnDerApply() {
	var expression = $('#expression').val();
	var derName = $('#derName').val();

	$('#derModal').modal('hide');

	var currentUser = firebase.auth().currentUser;
	var uid = currentUser.uid;

	$.ajax({
		data: {
			"expression": expression,
			"derName": derName,
			"uid": uid
		},
		url: "/derived",
		beforeSend: function() {
			loading();
		},
		complete: function() {
			complete()
		},
		success: function(res) {
			var data = res.data;
			showSummary(data);
			showData(res.data2, res.variable);

		},
		error: function(res) {
			// console.log(res);
		}
	});
}
