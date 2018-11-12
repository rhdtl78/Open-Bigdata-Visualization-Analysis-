function transTable() {
    $('#transTable > tbody').empty();
    var variable = new Array();
    var minArray = new Array();
    var maxArray = new Array();
    var typeArray = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        typeArray.push($(this).find("td").eq(1).html())
        minArray.push($(this).find("td").eq(4).html())
        maxArray.push($(this).find("td").eq(5).html())
    })
    for(i =1;i<variable.length;i++){
      if(typeArray[i]!="dtype(object)"){
        $('#transTable > tbody:last').append('<tr><td>'+variable[i]+'</td><td><input type="text" value='+minArray[i]+' class='+i+' style = width:50px disabled/> </td><td><input type="text" class='+i+' style = width:50px disabled/> </td><td><input type="text" class='+i+' style = width:50px disabled/> </td><td><input type="text" class='+i+' style = width:50px disabled/> </td><td><input type="text" value='+maxArray[i]+' class='+i+' style = width:50px disabled /> </td><td><input type="checkbox" onclick="btnTurn(this.id,this.checked)" class="transCheck" id='+i+' /></td></tr>')
      }
    }
}

function btnTurn(variable,value){
  //console.log(variable)
  if(value==true){
    $('input:text[class='+variable+']').attr("disabled",false)
  } else{
    $('input:text[class='+variable+']').attr("disabled",true)
  }
}
function btnTransApply(){
  $('#transModal').modal('hide');
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  var variable = new Array();
  var changeVar = new Array();
  var changeVal = new Array();

  $('#summaryTable tr').each(function () {
      variable.push($(this).find("td:first").text())
  })

  $('.transCheck').each(function(){
      if(this.checked){
        changeVar.push(variable[this.id]);
        let temp = new Array();
        $('input:text[class='+this.id+']').each(function(){
          if($(this).val()!=""){
            temp.push($(this).val());
          }
        })
        changeVal.push(temp)
      }
  })
  $.ajax({
    data: { "variable": changeVar, "category": changeVal, "uid":uid },
    url: "/transform",
    type: "POST",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res) {
      data = res.data;
      showSummary(data);
      showData(res.data2,res.variable);
    },
    error: function (res) {
      // console.log(res);
    }
  });
}
