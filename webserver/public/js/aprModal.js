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

      var table = $('<table width="100%" class="table table-bordered table-hover table-striped">');
      // table.append($('<tr><th>lhs</th><th> => </th><th>rhs</th><th>support</th><th>confidence</th><th>lift</th></tr>'))
      table.append($('<tr><th>rules</th></tr>'))
      // result = result.associationRules;
      // result.forEach(function(array){
      //   table.append($('<tr><td>'+array["lhs"]+'</td><td> => </td><td>'+array["rhs"]+'</td><td>'+array["support"].toFixed(4)+'</td><td>'+array["confidence"].toFixed(4)+'</td><td>'+array["lift"].toFixed(4)+'</td></tr>'));
      // })
      // console.log(rules)
      // for(i=0;i<rules.length;i++){
      //   table.append($('<tr><td>'+rules[i]+'</td></tr>'));
      // }
      // table.append($('<tr><td>'+rules+'</td></tr>'));
      rules.forEach(function(element){
        table.append($('<tr><td>'+element+'</td></tr>'));
      })

      div.append(table)
      $('#analysis').append(div);
}
