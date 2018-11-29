function covariance() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data:{"uid":uid},
    url: "/covariance",
    type:"POST",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      data = res.data;
      showCovariance(data);
    },
    error: function (res) {
      // console.log(res);
    }
  });

}
function showCovariance(cov) {
  //$('#analysis').empty();
  if(analIndex==0){
    $('#analysis').empty();
  }
  var name = "analysis" + analIndex;
  analIndex++;
  var btnName = "btn" + name;
  var btn = $('<input type="button" id=' + btnName + ' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
  $('#analysis').append(btn);
  var div = $('<div id=' + name + '/>');
  //$('#analysis').append(div);
  var data = new Array();
  var variable = new Array();

  for(i=0;i<cov.length;i++){
    cov[i] = cov[i].replace("(","")
    cov[i] = cov[i].replace(")","")
    var temp = cov[i].split(",")
    variable.push(temp[0])
    var array = new Array();
    for(j=1;j<temp.length;j++){
      array.push(parseFloat(temp[j]))
    }
    data.push(array)
  }

  var table = $('<table/>', {
    class: "table table-bordered table-hover table-striped"
  });

  var thead = $('<thead/>').appendTo(table);
  var headRow = $("<tr/>").appendTo(thead);
  headRow.append($('<th/>').addClass('covValue'));
  for (i = 0; i < variable.length; i++) {
    headRow.append($('<th/>').addClass('covValue').text(variable[i]));
  }

  var tbody = $('<tbody/>').appendTo(table);

  for (i = 0; i < variable.length; i++) {
    var bodyRow = $('<tr/>').appendTo(table);
    bodyRow.append($('<th/>', {
      class: "coValue",
      scope: "col"
    }).text(variable[i]));
    for (j = 0; j < variable.length; j++) {
      var fixData = data[i][j];
      fixData = parseFloat(fixData).toFixed(2)
      bodyRow.append($('<td/>').text(fixData));
    }
  }
  div.append(table)
  $('#analysis').append(div);

}
