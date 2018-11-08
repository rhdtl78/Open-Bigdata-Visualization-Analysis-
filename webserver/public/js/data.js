function showData(data,variable) {
  var target = $('#dataDiv').empty();
  var table = $('<table/>', {
    'class': 'table table-bordered table-hover table-striped',
    'id': 'dataTable',
    'style': 'width:100%;'
  })
  table.append($('<tr>'));
  variable.forEach(function(element){
    table.append($('<th>'+element+'</th>'))
  })
  table.append($('</tr>'));
  for(i=0;i<data.length;i++){
    table.append($('<tr>'));
    for(j=0;j<data[0].length;j++){
      table.append($('<td>'+data[i][j]+'</td>'))
    }
    table.append($('</tr>'));
  }

 table.appendTo(target);



}
