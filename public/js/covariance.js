function covariance() {
  $.ajax({
    url: "/covariance",
    success: function (res) {
      data = res.data;
      variable = res.variable
      showCovariance(data, variable);
    },
    error: function (res) {
      console.log(res);
    }
  });

}
function showCovariance(data, variable) {
  $('#analysis').empty();
  var table = $('<table width="100%" class="table table-striped table-bordered table-hover">').attr('id', 'covTable');

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
  $('#analysis').append(table);

}