function outlierVariable(variable) {
  $('#outlierTable > tbody').empty();

  variable.forEach(function (element) {
    $('#outlierTable > tbody:last').append('<tr><td name="outValue" value ='+element+'>' + element + '</td><td><input type="text" name="minValue" /></td><td><input type="text" name="maxValue" /></td>');
  });
}


function outlierBox() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;
  $.ajax({
    data:{"uid":uid},
    url: "/outlier/modal",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      data = res.data;
      variable = res.variable;
      outlierVariable(variable)
      showOutlierBox(variable, data);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}

function btnOutlierApply() {
  var minArray = new Array();
  $('input:text[name="minValue"]').each(function () {
    minArray.push(this.value);
  });
  var maxArray = new Array();
  $('input:text[name="maxValue"]').each(function () {
    maxArray.push(this.value);
  });
  var variableArray = new Array();
  $('#outlierTable tr').each(function () {
    variableArray.push($(this).find("td:first").text())
})
  $('#outlierModal').modal('hide');

  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data: { "minArray": minArray, "maxArray": maxArray, "variableArray":variableArray, "uid":uid },
    url: "/outlier",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      data = res.data;
      showSummary(data);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}
