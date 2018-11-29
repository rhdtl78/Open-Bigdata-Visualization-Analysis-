function showData(data, variable) {
  var target = $("#dataDiv").empty();
  var table = $("<table/>", {
    class: "table table-bordered table-hover table-striped",
    id: "dataTable",
    style: "width:100%;"
  });

  var thead = $('<thead/>').appendTo(table);
  var headRow = $("<tr/>").appendTo(thead);
  variable.forEach(function(element) {
    headRow.append($("<th>" + element + "</th>"));
  });

  var tbody = $('<tbody/>').appendTo(table);
  for (i = 0; i < data.length; i++) {
    var bodyRow = $('<tr/>').appendTo(tbody);
    for (j = 0; j < data[i].length; j++) {
      bodyRow.append($("<td>" + data[i][j] + "</td>"));
    }
  }

  table.appendTo(target);
}
