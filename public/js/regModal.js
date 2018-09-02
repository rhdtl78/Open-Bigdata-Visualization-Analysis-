function regTable() {
  $('#regTable > tbody').empty();
  var variable = new Array();
  var example = new Array();
  $('#summaryTable tr').each(function () {
    variable.push($(this).find("td:first").text())
  })
  for (i = 1; i < variable.length; i++) {
    $('#regTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="regDep" value=' + variable[i] + ' /></td><td><input type="checkbox" name="regIndep" value=' + variable[i] + ' /></td></tr>');
  }

}
function btnRegApply() {
  var dependent = new Array();
  $('input:checkbox[name="regDep"]').each(function () {
    if (this.checked) {
      dependent.push(this.value)
    }
  });
  var independent = new Array();
  $('input:checkbox[name="regIndep"]').each(function () {
    if (this.checked) {
      independent.push(this.value)
    }
  });
  $('#regModal').modal('hide');
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data: { "uid": uid, "dependent": dependent, "independent": independent },
    url: "/regression",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      var data = res.data;
      var variable = res.variable
      var pred = res.pred;
      var model = res.model
      showRegression(data, pred, variable, model);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}
function showRegression(data, pred, variable, model) {
  // $('#analysis').empty();
  if (analIndex == 0) {
    $('#analysis').empty();
  }
  var name = "analysis" + analIndex;
  analIndex++;
  var btnName = "btn" + name;
  var btn = $('<input type="button" id=' + btnName + ' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
  $('#analysis').append(btn);
  var div = $('<div id=' + name + '/>');
  $('#analysis').append(div);
  //$('#analysis').append($('<div>').attr('id', 'analysisGraph'));
  //var data = new Array();
  var theta = model.theta;
  var result = "";

  var trace = new Array();
  for (i = 0; i < variable.length; i++) {
    trace[i] = {
      //x: data[i],
      y: data[i],
      type: 'scatter',
      mode: "markers",
      name: variable[i]
    };
    if (i == 0) {
      result += theta[i].toFixed(4) + " + ";
    } else {
      result += "(" + variable[i - 1] + "*" + theta[i].toFixed(4) + ") + "
    }
  }
  result = variable[variable.length - 1] + " = " + result;
  result = result.slice(0, -2);
  trace[variable.length] = {
    //x: data[i],
    y: pred,
    type: 'scatter',
    mode: "line",
    name: variable.pop() + " predicted"
  };
  var layout = {
    title: result
  };

  Plotly.newPlot(name, trace, layout);

}