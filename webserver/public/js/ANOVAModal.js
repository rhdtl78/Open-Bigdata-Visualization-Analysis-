function ANOVATable() {
    $('#ANOVATable > tbody').empty();
    var variable = new Array();
    var type = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        type.push($(this).find("td").eq(1).html())
    })
    for (i = 1; i < variable.length; i++) {
        if(type[i]!="dtype(object)"){
          $('#ANOVATable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="dependentSelect" value=' + variable[i] + ' /></td><td><input type="checkbox" name="independentSelect" value=' + variable[i] + ' /></td></tr>');
        }
    }
}

function btnANOVAApply() {
    var depSelect = new Array();
    $('input:checkbox[name="dependentSelect"]').each(function () {
        if (this.checked) {
            depSelect.push(this.value)
        }
    });
    var indepSelect = new Array();
    $('input:checkbox[name="independentSelect"]').each(function () {
        if (this.checked) {
            indepSelect.push(this.value)
        }
    });

    $('#ANOVAModal').modal('hide');
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    $.ajax({
        data: { "dependent": depSelect[0],"independent":indepSelect,"uid":uid },
        url: "/ANOVA",
        type: "POST",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
            var data = res.result;
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

      var independent = data[0];
      independent = independent.substring(1,independent.length-1)
      independent = independent.split(",")
      var residual = data[1];
      residual = residual.substring(1,residual.length-1)
      residual = residual.split(",")

      var table = $('<table width="100%" class="table table-bordered table-hover table-striped">');

      table.append($('<tr><th></th><th>Degrees of Freedom</th><th>Sum of Squares</th><th>Mean Square</th><th>F</th><th>Probability of the F value</th></tr>'));

      // table.append($('<tr><td> Sum of Squares </td><td>'+parseFloat(treatment["SS"]).toFixed(4)+'</td><td>'+parseFloat(residual["SS"]).toFixed(4)+'</td><td>'+parseFloat(total["SS"]).toFixed(4)+'</td></tr>'));
      // table.append($('<tr><td> Degrees of Freedom </td><td>'+parseFloat(treatment["DF"]).toFixed(4)+'</td><td>'+parseFloat(residual["DF"]).toFixed(4)+'</td><td>'+parseFloat(total["DF"]).toFixed(4)+'</td></tr>'));
      // table.append($('<tr><td> Mean Square </td><td>'+parseFloat(treatment["MS"]).toFixed(4)+'</td><td>'+parseFloat(residual["MS"]).toFixed(4)+'</td><td></td></tr>'));
      // table.append($('<tr><td> F </td><td>'+parseFloat(treatment["F"]).toFixed(4)+'</td><td></td><td></td></tr>'));

      table.append($('<tr><td> '+independent[0]+' </td><td>'+independent[1]+'</td><td>'+independent[2]+'</td><td>'+independent[3]+'</td><td>'+independent[4]+'</td><td>'+independent[5]+'</td></tr>'));
      table.append($('<tr><td> '+residual[0]+' </td><td>'+residual[1]+'</td><td>'+residual[2]+'</td><td>'+residual[3]+'</td><td>'+residual[4]+'</td><td>'+residual[5]+'</td></tr>'));


      div.append(table)
      $('#analysis').append(div);

}
