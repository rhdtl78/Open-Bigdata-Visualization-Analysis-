function colTable() {
    $('#colTable > tbody').empty();
    var variable = new Array();
    $('#summaryTable tr').each(function () {
        variable.push($(this).find("td:first").text())
    })
    for (i = 1; i < variable.length; i++) {
        $('#colTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><input type="checkbox" name="colSelect" value=' + variable[i] + ' /></td></tr>');
    }
}

function btnColApply() {
    var colSelect = new Array();
    $('input:checkbox[name="colSelect"]').each(function () {
        if (this.checked) {
            colSelect.push(this.value)
        }
    });

    $('#colModal').modal('hide');
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;

    $.ajax({
        data: { "colSelect": colSelect,"uid":uid },
        url: "/removeCol",
        type: "post",
        beforeSend: function () {
          loading();
        },
        complete: function () {
          complete()
        },
        success: function (res) {
            var data = res.data;
            showSummary(data);
            showData(res.data2,res.variable);        
        },
        error: function (res) {
            // console.log(res);
        }
    });
}