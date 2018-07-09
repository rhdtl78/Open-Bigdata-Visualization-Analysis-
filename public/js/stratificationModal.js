function strVariable(name){
    $('#strSelect').empty();   
    var variable = new Array();
    $('#summaryTable tr').each(function(){
        variable.push($(this).find("td:first").text())
    })
    variable = variable.slice(1,variable.length)
   for(let element of variable){                
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
    
    $.ajax({
        data : {"variable": variable[1],"uid":uid},
        url : "/stratification/modal",
        success : function (res) {
          data = res.data;
          variable = res.variable;
          strVariable(variable)
          showStrScatter(variable,data);         
        },
        error : function (res) {
          console.log(res);
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
        success : function (res) {
          data = res.data;
          variable = res.variable;
          strVariable(variable)
          showStrScatter(variable,data);
          
        },
        error : function (res) {
          console.log(res);
        }
      }); 
}

function btnStratificationApply(){
    var variable =  $("#strSelect").val()
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    
    $('#stratificationModal').modal('hide');
    $.ajax({
        data : {"yRange": yRange,"variable":variable,"uid":uid},
        url : "/stratification",
        success : function (res) {
          data = res.data;
          showSummary(data);
        },
        error : function (res) {
          console.log(res);
        }
      });
}