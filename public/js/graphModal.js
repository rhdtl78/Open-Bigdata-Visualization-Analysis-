function graphVariable(type) {
    $('#graphTable > tbody').empty();
    var variable = new Array();
    var example = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
        example.push($(this).find("td").eq(8).html())
    })
    for (i = 1; i < variable.length; i++) {
        $('#graphTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + example[i] + '</td><td><input type="checkbox" name="Xcheck" value=' + variable[i] + ' /></td><td><input type="checkbox" name="Ycheck" value=' + variable[i] + ' /></td>');
    }
    $("input:radio[name='graphRadio']").each(function () {
        if (type == this.value) {
            $(this).attr("checked", true) ;
        }
    });
    

}
function btnGraphApply() {
    var xVar = new Array();
    $('input:checkbox[name="Xcheck"]').each(function () {
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

    $.ajax({
        data: { "xVar": xVar, "yVar": yVar, "type": type },
        url: "/graph",
        success: function (res) {
            Xdata = res.Xdata;
            Ydata = res.Ydata;
            variable = res.variable;
            type = res.type;
            showplotly(variable, Xdata, Ydata, type);
        },
        error: function (res) {
            console.log(res);
        }
    });
}
