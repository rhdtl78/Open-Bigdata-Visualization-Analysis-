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

  var table = $('<table width="100%" class="table table-bordered table-hover table-striped">');

  table.append($('<th>').addClass('covValue').text(" "));
  for (i = 0; i < variable.length; i++) {
    var row = $('<th>').addClass('covValue').text(variable[i]);
    table.append(row);
  }
  table.append($('<tr>').addClass('covValue').text(" "));
  for (i = 0; i < variable.length; i++) {
    var row = $('<td>').addClass('covValue').text(variable[i]);
    table.append(row);
    for (j = 0; j < variable.length; j++) {
      var fixData = data[i][j];
      fixData = parseFloat(fixData).toFixed(2)
      table.append($('<td>').text(fixData));

    }
    table.append($('<tr>'))
  }
  div.append(table)
  $('#analysis').append(div);

}
