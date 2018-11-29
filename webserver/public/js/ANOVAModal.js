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

      var table = $('<table/>', {
        class: "table table-bordered table-hover table-striped"
      });

      var thead = $("<thead/>").appendTo(table);
      var tbody = $("<tbody/>").appendTo(table);

      var headRow = $("<tr/>").appendTo(thead);
      var bodyRow = $("<tr/>").appendTo(tbody);

      headRow.append($("<th/>").text('Variable'))
      .append($("<th/>").text("Degrees of Freedom"))
      .append($("<th/>").text("Sum of Squares"))
      .append($("<th/>").text("Mean Square"))
      .append($("<th/>").text("F"))
      .append($("<th/>").text("Probability of the F value"));

      bodyRow.append($("<td/>").text(independent[0]))
      .append($("<td/>").text(independent[1]))
      .append($("<td/>").text(independent[2]))
      .append($("<td/>").text(independent[3]))
      .append($("<td/>").text(independent[4]))
      .append($("<td/>").text(independent[5]))

      bodyRow = $("<tr/>").appendTo(tbody);
      bodyRow.append($("<td/>").text(residual[0]))
      .append($("<td/>").text(residual[1]))
      .append($("<td/>").text(residual[2]))
      .append($("<td/>").text(residual[3]))
      .append($("<td/>").text(residual[4]))
      .append($("<td/>").text(residual[5]))

      div.append(table)
      $('#analysis').append(div);

}
