function NATable() {
    var variable = new Array();
    var NAcount = new Array();
    var NApercent = new Array();
    var totalCount = new Array();

    var tr = $('#summaryTable tr');
    var td = tr.children();
    var tdArr = new Array()
    $('#summaryTable tr').each(function () {
        var vari = $(this).find("td").eq(0).html();
        var NAco = $(this).find("td").eq(6).html();
        var total = $(this).find("td").eq(7).html();
        if (vari != undefined) {
            variable.push(vari)
        }
        if (NAco != undefined) {
            NAcount.push(NAco)
        }
        if (total != undefined) {
            totalCount.push(total)
            NApercent.push((NAco / total) * 100);
        }
    });

    $('#NATable > tbody').empty();
    $('#NAPorcessTable > tbody').empty();

    for (i = 1; i < variable.length; i++) {
        if (NAcount[i] > 0) {
            $('#NATable > tbody:last').append('<tr><td>' + variable[i] + '</td><td>' + NAcount[i] + '</td><td>' + NApercent[i] + '</td><td>' + totalCount[i] + '</td></tr>');
            $('#NAPorcessTable > tbody:last').append('<tr><td>' + variable[i] + '</td><td><select name="NAselect"><option value="remove">remove row</option><option value="mean">mean</option><option value="median">median</option></select></td></tr>');
        }
    }
}

function btnNotAvailableApply() {
    var variable = new Array()
    $('#NAPorcessTable tr').each(function () {
        var vari = $(this).find("td").eq(0).html();
        if (vari != undefined) {
            variable.push(vari);
        }
    });
    var process = new Array();
    $('[name="NAselect"]').each(function () {
        process.push(this.value)
    });
    var mean = new Array();
    var median = new Array();


    $('#notAvailableModal').modal('hide');

    $.ajax({
        data: { "variable": variable, "process": process },
        url: "/notAvailable",
        success: function (res) {
            data = res.data;
            showSummary(data);
        },
        error: function (res) {
            console.log(res);
        }
    });
}