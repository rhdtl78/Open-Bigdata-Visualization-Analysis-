function NATable() {
  var variable = new Array();
  var NAcount = new Array();
  var NApercent = new Array();
  var totalCount = new Array();

  var tr = $('#summaryTable tr');
  var td = tr.children();
  var tdArr = new Array()
  $('#summaryTable tr').each(function() {
    var vari = $(this).find("td").eq(0).html();
    var NAco = $(this).find("td").eq(6).html();
    var total = $(this).find("td").eq(7).html();
    if (vari) {
      variable.push(vari)
    }
    if (NAco) {
      NAcount.push(NAco)
    }
    if (total) {
      totalCount.push(total)
      NApercent.push(((NAco / total) * 100).toFixed(2));
    }
  });

  $('#NATable > tbody').empty();
  //$('#NAPorcessTable > tbody').empty();

  for (i = 1; i < variable.length; i++) {
    if (NAcount[i] > 0) {
      //$('#NATable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + NAcount[i] + '</td><td>' + NApercent[i] + '</td><td>' + totalCount[i] + '</td></tr>');

      var tr= $('<tr/>');
      var td_val = $('<td/>', {
        'name': 'variable-name'
      }).text(variable[i]);
      var td_NAc = $('<td/>', {
        'name': 'NAcount'
      }).text(NAcount[i]);
      var td_NAp = $('<td/>', {
        'name': 'NApercent'
      }).text(NApercent[i]);
      var td_NAtotal = $('<td/>', {
        'name': 'totalCount'
      }).text(totalCount[i]);

      var td_sel = $('<td/>');
      var formGroup = $('<div/>', {
        'class': 'form-group',
      });
      var select = $('<select/>', {
        'name': 'NAselect',
        'class': 'form-control'
      });
      var optionRm = $('<option/>', {
        'value': 'remove'
      }).text('Remove Row');
      var optionMean = $('<option/>', {
        'value': 'mean'
      }).text('Add Mean');
      var optionMedian = $('<option/>', {
        'value': 'median'
      }).text('Add Median');

      select.append(optionRm).append(optionMean).append(optionMedian);
      formGroup.append(select);
      td_sel.append(formGroup);
      tr.append(td_val).append(td_NAc).append(td_NAp).append(td_NAtotal).append(td_sel);
      $('#NATable > tbody:last').append(tr);

    }
  }
}

function btnNotAvailableApply() {
  var variable = new Array();
  var variableCol = $('td[name="variable-name"]');

	const summaryTable = $('#summaryTable > tbody tr');
	const NAVariable = [];
	summaryTable.each(function (idx, element) {
		if ($(element).children().eq(6).text() !== '0'){
			NAVariable.push($(element).children().eq(0).text());
		}
	})

	console.log(NAVariable);

  var process = new Array();
  $('[name="NAselect"]').each(function() {
    process.push(this.value)
  });
  var mean = new Array();
  var median = new Array();


  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data: {
      "variable": NAVariable,
      "process": process,
      "uid": uid,
    },
    url: "/notAvailable",
    type: "POST",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function(res) {
      console.log(res);


      showSummary(res.summary);
      showData(res.dataframe,res.variable);
      $('#notAvailableModal').modal('hide');

    },
    error: function(res) {
      // console.log(res);
    }
  });
}
