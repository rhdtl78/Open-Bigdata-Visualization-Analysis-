function regTable() {
  $('#regTable > tbody').empty();
  var variable = new Array();
  var type = new Array();
  $('#summaryTable tr').each(function () {
    variable.push($(this).find("td:first").text())
    type.push($(this).find("td").eq(1).html())
  })
  for (i = 1; i < variable.length; i++) {
    if(type[i]!="dtype(object)"){
      $('#regTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="regDep" value=' + variable[i] + ' /></td><td><input type="checkbox" name="regIndep" value=' + variable[i] + ' /></td></tr>');
    }
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
    type: "POST",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      var xData = res.xData;
      var yData = res.yData
      var pred = res.pred;
      var params = res.params;
      var xDataVal = res.xDataVal;
      var yDataVal = res.yDataVal;
      // console.log("=====pred====")
      // console.log(pred)
      // console.log("=====xData====")
      // console.log(yData)
      // console.log("=====parmas====")
      // console.log(params)
      showRegression(xData, yData, pred, params, xDataVal, yDataVal);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}
function showRegression(xData, yData, pred, params, xDataVal, yDataVal) {
  // $('#analysis').empty();
  // if (analIndex == 0) {
  //   $('#analysis').empty();
  // }
  // var result = "";
  // var theta = model.theta;
  // for (i = 0; i < variable.length; i++) {
  //   if (i == 0) {
  //     result += theta[i].toFixed(4) + " + ";
  //   } else {
  //     result += "(" + variable[i - 1] + "*" + theta[i].toFixed(4) + ") + "
  //   }
  // }
  // result = variable[variable.length - 1] + " = " + result;
  // result = result.slice(0, -2);
  //
  // for (i = 0; i < variable.length; i++) {
  //   var name = "analysis" + analIndex;
  //   analIndex++;
  //   var btnName = "btn" + name;
  //   var btn = $('<input type="button" id=' + btnName + ' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
  //   $('#analysis').append(btn);
  //   var div = $('<div id=' + name + '/>');
  //   $('#analysis').append(div);
  //   //$('#analysis').append($('<div>').attr('id', 'analysisGraph'));
  //   //var data = new Array();
  //
  //   var trace = new Array();
  //   trace[0] = {
  //       x: data[i],
  //       y: data[variable.length-1],
  //       type: 'scatter',
  //       mode: "markers",
  //       name: variable[i]
  //   }
  //   trace[1] = {
  //     x: data[i],
  //     y: pred,
  //     type: 'scatter',
  //     mode: "markers",
  //     name: variable.pop() + " predicted"
  //   };
  //   var layout = {
  //     title: result
  //   };
  //   Plotly.newPlot(name, trace, layout);
  // }
  if (analIndex == 0) {
    $('#analysis').empty();
  }
  var result = xDataVal + " = " + params[0].toFixed(4);
  for (i = 0; i < yDataVal.length; i++) {
    result += " + (" + yDataVal[i] + "*" + params[i+1].toFixed(4) + ")"
  }
  // console.log("result = "+result)
  for (i = 0; i < yData.length; i++) {
    var name = "analysis" + analIndex;
    analIndex++;
    var btnName = "btn" + name;
    var btn = $('<input type="button" id=' + btnName + ' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
    $('#analysis').append(btn);
    var div = $('<div id=' + name + '/>');
    $('#analysis').append(div);
  //$('#analysis').append($('<div>').attr('id', 'analysisGraph'));
  //var data = new Array();

    var trace = new Array();
    trace[0] = {
        x: yData[i],
        y: xData,
        type: 'scatter',
        mode: "markers",
        name: xDataVal
      }
    trace[1] = {
        x: yData[i],
        y: pred,
        type: 'scatter',
        mode: "markers",
        name: yDataVal[i] + "predict"
      };
    var layout = {
      title: result
    };
    Plotly.newPlot(name, trace, layout);
  }
}
