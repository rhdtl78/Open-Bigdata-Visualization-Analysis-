function strVariable(name){
    $('#strSelect').empty();
    var variable = new Array();
    var type = new Array();
    var straVariable = new Array();

    $('#summaryTable tr').each(function(){
        variable.push($(this).find("td:first").text())
        type.push($(this).find("td").eq(1).html())
    })
    for (i = 1; i < variable.length; i++) {
      if(type[i]!="dtype(object)"){
        straVariable.push(variable[i]);
      }
    }

   for(let element of straVariable){
        if(element == name){
            var option = $("<option value="+element+" selected>"+element+"</option>");
            $('#strSelect').append(option);
        } else {
            var option = $("<option value="+element+">"+element+"</option>");
            $('#strSelect').append(option);
        }
    }
}

function strScatter(){
    var variable = new Array();
    $('#summaryTable tr').each(function(){
        variable.push($(this).find("td:first").text())
    })
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    var variable = new Array();
    var type = new Array();
    var straVariable = new Array();

    $('#summaryTable tr').each(function(){
        variable.push($(this).find("td:first").text())
        type.push($(this).find("td").eq(1).html())
    })
    for (i = 1; i < variable.length; i++) {
      if(type[i]!="dtype(object)"){
        straVariable.push(variable[i]);
      }
    }
    $.ajax({
        data : {"variable": straVariable[0],"uid":uid},
        url : "/stratification/modal",
        success : function (res) {
          data = res.data;
          variable = res.variable;
          strVariable(variable)
          showStrScatter(variable,data);
        },
        error : function (res) {
          // console.log(res);
        }
      });
}

function itemChange(){
    var selectItem = $("#strSelect").val();
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $.ajax({
        data : {"variable": selectItem,"uid":uid},
        url : "/stratification/modal",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success : function (res) {
          data = res.data;
          variable = res.variable;
          strVariable(variable)
          showStrScatter(variable,data);

        },
        error : function (res) {
          // console.log(res);
        }
      });
}

function btnStratificationApply(){
    var variable =  $("#strSelect").val()
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $('#stratificationModal').modal('hide');
    $.ajax({
        data : {"yRange": yRange,"variable":variable,"uid":uid,"xRange":xRange},
        url : "/stratification",
        type:"POST",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success : function (res) {
          data = res.data;
          showSummary(data);
          showData(res.data2,res.variable);
        },
        error : function (res) {
          // console.log(res);
        }
      });
}
