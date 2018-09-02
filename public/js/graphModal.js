function graphVariable(type) {
    $('#graphTable > tbody').empty();
    var variable = new Array();
    var example = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        example.push($(this).find("td").eq(8).html())
    })
    for (i = 1; i < variable.length; i++) {
        $('#graphTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><input type="radio" name="Xradio" value=' + variable[i] + ' /></td><td><input type="checkbox" name="Ycheck" value=' + variable[i] + ' /></td>');
    }
    $("input:radio[name='graphRadio']").each(function () {
        // console.log("this.check= "+this.value+" type="+type)
        if (this.checked) {
            $(this).removeAttr("checked") ;
        }
    });

    $("input:radio[name='graphRadio']").each(function () {
        // console.log("this.check= "+this.value+" type="+type)
        if (this.value==type) {
            $(this).attr("checked", true) ;
        }
    });


}

function graph3dVariable(type) {
    $('#graph3dTable > tbody').empty();
    var variable = new Array();
    var example = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        example.push($(this).find("td").eq(8).html())
    })
    for (i = 1; i < variable.length; i++) {
        $('#graph3dTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><input type="radio" name="xVar" value=' + variable[i] + ' /></td><td><input type="radio" name="yVar" value=' + variable[i] + ' /></td><td><input type="radio" name="zVar" value=' + variable[i] + ' /></td></tr>');
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

function btnGraphApply() {
    var xVar = new Array();
    $('input:radio[name="Xradio"]').each(function () {
        if (this.checked) {
            xVar.push(this.value);
        }
    });
    var yVar = new Array();
    $('input:checkbox[name="Ycheck"]').each(function () {
        if (this.checked) {
            yVar.push(this.value)
        }
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
    $('input:radio[name="xVar"]').each(function () {
        if (this.checked) {
            xVar.push(this.value);
        }
    });
    var yVar = new Array();
    $('input:radio[name="yVar"]').each(function () {
        if (this.checked) {
            yVar.push(this.value)
        }
    });
    var zVar = new Array();
    $('input:radio[name="zVar"]').each(function () {
        if (this.checked) {
            zVar.push(this.value)
        }
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
