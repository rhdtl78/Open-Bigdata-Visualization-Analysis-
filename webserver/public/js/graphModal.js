variListIndex = 0;
variX = null;
variY = null;
variZ = null;

function graphVariable(type) {
    $('#graphTable > tbody').empty();
    $('#variList').empty();
    variX=null; variY=null; $("#showVariX").text(''); $("#showVariY").text('');

    var variable = new Array();
    var example = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        example.push($(this).find("td").eq(8).html())
    })
    for (i = 1; i < variable.length; i++) {
        //$('#graphTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><input type="radio" name="Xradio" value=' + variable[i] + ' /></td><td><input type="checkbox" name="Ycheck" value=' + variable[i] + ' /></td>');
        $('#graphTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><button type="button" class="btn btn-primary" value=' + variable[i] + ' onclick="btnVariable(this.value,'+1+')"></button></td><td><button type="button" class="btn btn-danger" value=' + variable[i] + ' onclick="btnVariable(this.value,'+2+')"></button></td>');
    }

    $("input:radio[name='graphRadio']").each(function () {
        //console.log("this.check= "+this.value+" type="+type)
        if (this.checked) {
            $(this).removeAttr("checked");
        }
    });

    $("input:radio[name='graphRadio']").each(function () {
        //console.log("this.check= "+this.value+" type="+type)
        if (this.value==type) {
            $(this).attr("checked", true);
        }
    });

}

function btnVariable(variName,select){
    //console.log(variName)
    if(select == 1){
        $("#showVariX").text(variName);
        variX = variName;
    }else if(select == 2){
        $("#showVariY").text(variName);
        variY = variName;
    }
    if(variX!=null && variY!=null){
        var name = "variList" + variListIndex;
        variListIndex++;
        var btnName = "btn"+name;
        var div = $('<div id='+name+'>X = <label class="variXList">'+variX+'</label> Y = <label class="variYList">'+variY+'</label>  <input type="button" id='+btnName+' class="btn btn-outline-danger btn-sm" onclick="variListClose(this.id)" value="X"/></div>')
        $("#variList").append(div)
        variX=null; variY=null; $("#showVariX").text(''); $("#showVariY").text('');
    }
}
function variListClose(id){
    id = id.slice(3,id.length);
    $('#'+id).remove()
}

function graph3dVariable(type) {
    $('#graph3dTable > tbody').empty();
    $('#vari3dList').empty();
    variX=null; variY=null;variZ=null; $("#show3dVariX").text(''); $("#show3dVariY").text(''); $("#show3dVariZ").text('');
    
    var variable = new Array();
    var example = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        example.push($(this).find("td").eq(8).html())
    })
    for (i = 1; i < variable.length; i++) {
        //$('#graph3dTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><input type="radio" name="xVar" value=' + variable[i] + ' /></td><td><input type="radio" name="yVar" value=' + variable[i] + ' /></td><td><input type="radio" name="zVar" value=' + variable[i] + ' /></td></tr>');
        $('#graph3dTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><button type="button" class="btn btn-primary" value=' + variable[i] + ' onclick="btn3dVariable(this.value,'+1+')"></button></td> <td><button type="button" class="btn btn-danger" value=' + variable[i] + ' onclick="btn3dVariable(this.value,'+2+')"></button></td><td><button type="button" class="btn btn-success" value=' + variable[i] + ' onclick="btn3dVariable(this.value,'+3+')"></button></td>');
        
    }
    $("input:radio[name='graph3dRadio']").each(function () {
        // console.log("this.check= "+this.value+" type="+type)
        if (this.checked) {
            $(this).removeAttr("checked") ;
        }
    });

    $("input:radio[name='graph3dRadio']").each(function () {
        // console.log("this.check= "+this.value+" type="+type)
        if (this.value==type) {
            $(this).attr("checked", true) ;
        }
    });
}
function btn3dVariable(variName,select){
    //console.log(variName)
    if(select == 1){
        $("#show3dVariX").text(variName);
        variX = variName;
    }else if(select == 2){
        $("#show3dVariY").text(variName);
        variY = variName;
    }else if(select == 3){
        $("#show3dVariZ").text(variName);
        variZ = variName;
    } 
    if(variX!=null && variY!=null && variZ!=null){
        var name = "variList" + variListIndex;
        variListIndex++;
        var btnName = "btn"+name;
        var div = $('<div id='+name+'>X = <label class="vari3dXList">'+variX+'</label> Y = <label class="vari3dYList">'+variY+'</label> Z = <label class="vari3dZList">'+variZ+'</label>  <input type="button" id='+btnName+' class="btn btn-outline-danger btn-sm" onclick="variListClose(this.id)" value="X"/></div>')
        $("#vari3dList").append(div)
        variX=null; variY=null;variY=null; $("#show3dVariX").text(''); $("#show3dVariY").text(''); $("#show3dVariZ").text('');
    }
}

function btnGraphApply() {
    var xVar = new Array();
    // $('input:radio[name="Xradio"]').each(function () {
    //     if (this.checked) {
    //         xVar.push(this.value);
    //     }
    // });
    $('.variXList').each(function () {
        xVar.push($(this).text());    
    });
    var yVar = new Array();
    // $('input:checkbox[name="Ycheck"]').each(function () {
    //     if (this.checked) {
    //         yVar.push(this.value)
    //     }
    // });
    $('.variYList').each(function () {
        yVar.push($(this).text());    
    });

    $('input:radio[name="graphRadio"]').each(function () {
        if (this.checked) {
            type = this.value
        }
    });

    $('#graphModal').modal('hide');
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $.ajax({
        data: { "xVar": xVar, "yVar": yVar, "type": type,"uid":uid },
        url: "/graph",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
            var Xdata = res.Xdata;
            var Ydata = res.Ydata;
            var variable = res.variable;
            var type = res.type;
            // console.log(Xdata)
            // console.log(Ydata)
            // console.log(type)
            showplotly(variable, Xdata, Ydata, type);
        },
        error: function (res) {
            // console.log(res);
        }
    });
}

function btnGraph3dApply() {
    var xVar = new Array();
    // $('input:radio[name="xVar"]').each(function () {
    //     if (this.checked) {
    //         xVar.push(this.value);
    //     }
    // });
    $('.vari3dXList').each(function () {
        xVar.push($(this).text());    
    });
    var yVar = new Array();
    // $('input:radio[name="yVar"]').each(function () {
    //     if (this.checked) {
    //         yVar.push(this.value)
    //     }
    // });
    $('.vari3dYList').each(function () {
        yVar.push($(this).text());    
    });
    var zVar = new Array();
    // $('input:radio[name="zVar"]').each(function () {
    //     if (this.checked) {
    //         zVar.push(this.value)
    //     }
    // });
    $('.vari3dZList').each(function () {
        zVar.push($(this).text());    
    });

    $('input:radio[name="graph3dRadio"]').each(function () {
        if (this.checked) {
            type = this.value
        }
    });

    $('#graph3dModal').modal('hide');
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $.ajax({
        data: { "xVar": xVar, "yVar": yVar,"zVar": zVar, "type": type,"uid":uid },
        url: "/graph/3d",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
            var Xdata = res.Xdata;
            var Ydata = res.Ydata;
            var Zdata = res.Zdata;
            var variable = res.variable;
            var type = res.type;

            show3dplotly(variable, Xdata, Ydata, Zdata,type);
        },
        error: function (res) {
            // console.log(res);
        }
    });
}
