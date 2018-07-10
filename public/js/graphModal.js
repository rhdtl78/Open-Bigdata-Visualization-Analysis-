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
            Xdata = res.Xdata;
            Ydata = res.Ydata;
            variable = res.variable;
            type = res.type;
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
