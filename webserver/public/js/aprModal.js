function aprTable() {
    $('#aprTable > tbody').empty();
    var variable = new Array();
    var type = new Array();
    $('#summaryTable tr').each(function () {
      variable.push($(this).find("td:first").text())
      type.push($(this).find("td").eq(1).html())
    })
    for (i = 1; i < variable.length; i++) {
      if(type[i]=="dtype(object)"){
        $('#aprTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="aprSelect" value=' + variable[i] + ' /></td></tr>');
      }
    }
}
function btnAprApply() {
    var variableArray = new Array();
    $('input:checkbox[name="aprSelect"]').each(function () {
        if (this.checked) {
          variableArray.push(this.value)
        }
      });
      $('#aprModal').modal('hide');
      var minSup = $('#minSupport').val();
      var minCon = $('#minConfidence').val();

      var currentUser = firebase.auth().currentUser;
      var uid = currentUser.uid;
      $.ajax({
        data: { "uid": uid, "variableArray": variableArray, "minSup":minSup,"minCon":minCon },
        url: "/apriori",
        type: "POST",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
        //   var data = res.data;
        //   var variable = res.variable
        //   var pred = res.pred;
        //   var model = res.model
        //   showApriori(data, pred, variable, model);
        var result = res.rules
        showApriori(result)

        },
        error: function (res) {
          // console.log(res);
        }
      });
}

function showApriori(rules) {
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

      var table = $('<table/>', {
        class: "table table-bordered table-hover table-striped"
      });

      var thead = $("<thead/>").appendTo(table);
      var tbody = $("<tbody/>").appendTo(table);

      var headRow = $("<tr/>").appendTo(thead);

      headRow.append($("<th/>").text("LHS"))
      .append($("<th/>").text("-->"))
      .append($("<th/>").text("RHS"))
      .append($("<th/>").text("Confidence"))
      .append($("<th/>").text("Support"))
      .append($("<th/>").text("Lift"))

      rules.forEach(function(element){
        element = element.split("->");
        var lhs = element[0];
        element = element[1].split("(conf:")
        var rhs = element[0];
        element = element[1].split("supp:")
        var conf = element[0];
        conf = conf.substring(0,conf.length-2);
        element = element[1].split("lift:")
        var supp = element[0];
        supp = supp.substring(0,supp.length-2);
        element = element[1].split("conv:")
        var lift = element[0];
        lift = lift.substring(0,lift.length-2);

        var bodyRow = $("<tr/>").appendTo(tbody);
        bodyRow.append($("<td/>").text(lhs))
        .append($("<td/>").text("-->"))
        .append($("<td/>").text(rhs))
        .append($("<td/>").text(conf))
        .append($("<td/>").text(supp))
        .append($("<td/>").text(lift))
      })

      div.append(table)
      $('#analysis').append(div);
}
