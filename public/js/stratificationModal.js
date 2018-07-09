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
    
    $.ajax({
        data : {"variable": variable[1]},
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
    $.ajax({
        data : {"variable": selectItem},
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
    $('#stratificationModal').modal('hide');
    $.ajax({
        data : {"yRange": yRange,"variable":variable},
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