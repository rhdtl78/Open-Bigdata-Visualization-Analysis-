function showSummary(data) {
  var target = $('#summayDiv').empty();
  var table = $('<table/>', {
    'class': 'table table-bordered table-hover table-striped',
    'id': 'summaryTable',
    'style': 'width:100%;'
  }).append(
    $('<thead/>').append(
      $('<tr/>')
      .append('<th>variable name</th>')
      .append('<th>type</th>')
      .append('<th>mean</th>')
      .append('<th>median</th>')
      .append('<th>min</th>')
      .append('<th>max</th>')
      .append('<th>NA count</th>')
      .append('<th>total count</th>')
      .append('<th>example</th>')
    )
  );
  table.appendTo(target);

  var tbody = $('<tbody/>').appendTo(table);

  for (i = 0; i < data[0].length; i++) {
    var tr = $('<tr/>')
      .append($('<td/>', {
        "name" : "variable"
      }).text(data[0][i]))
      .append($('<td/>').text(data[1][i]))
      .append($('<td/>').text(data[2][i]))
      .append($('<td/>').text(data[3][i]))
      .append($('<td/>').text(data[4][i]))
      .append($('<td/>').text(data[5][i]))
      .append($('<td/>').text(data[6][i]))
      .append($('<td/>').text(data[7][i]))
      .append($('<td/>').text(data[8][i]))
    tbody.append(tr);
  }

}
