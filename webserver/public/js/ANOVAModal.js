function ANOVATable() {
    $('#ANOVATable > tbody').empty();
    var variable = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
    })
    for (i = 1; i < variable.length; i++) {
        $('#ANOVATable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="ANOVASelect" value=' + variable[i] + ' /></td></tr>');
    }
}

function btnANOVAApply() {
    var colSelect = new Array();
    $('input:checkbox[name="ANOVASelect"]').each(function () {
        if (!this.checked) {
            colSelect.push(this.value)
        }
    });

    $('#ANOVAModal').modal('hide');
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $.ajax({
        data: { "colSelect": colSelect,"uid":uid },
        url: "/ANOVA",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
            var data = res.data;
            showANOVA(data);
        },
        error: function (res) {
            // console.log(res);
        }
    });
}
function showANOVA(data){
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
      
      var treatment = data.treatment;
      var residual = data.residual;
      var total = data.total;
      
      var table = $('<table width="100%" class="table table-bordered table-hover table-striped">');
    
      table.append($('<tr><th></th><th>treatment</th><th>residual</th><th>total</th></tr>'));

      table.append($('<tr><td> Sum of Squares </td><td>'+parseFloat(treatment["SS"]).toFixed(4)+'</td><td>'+parseFloat(residual["SS"]).toFixed(4)+'</td><td>'+parseFloat(total["SS"]).toFixed(4)+'</td></tr>'));
      table.append($('<tr><td> Degrees of Freedom </td><td>'+parseFloat(treatment["DF"]).toFixed(4)+'</td><td>'+parseFloat(residual["DF"]).toFixed(4)+'</td><td>'+parseFloat(total["DF"]).toFixed(4)+'</td></tr>'));
      table.append($('<tr><td> Mean Square </td><td>'+parseFloat(treatment["MS"]).toFixed(4)+'</td><td>'+parseFloat(residual["MS"]).toFixed(4)+'</td><td></td></tr>'));
      table.append($('<tr><td> F </td><td>'+parseFloat(treatment["F"]).toFixed(4)+'</td><td></td><td></td></tr>'));
      
      
      div.append(table)
      $('#analysis').append(div);
    
}