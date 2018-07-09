function showSummary(data){
    $('#summaryTable > tbody').empty();
    for(i=0;i<data[0].length;i++){
        $('#summaryTable > tbody:last').append('<tr><td name="variable">'+data[0][i]+'</td><td>'+data[1][i]+'</td><td>'+data[2][i]+'</td><td>'+data[3][i]+'</td><td>'+data[4][i]+'</td><td>'+data[5][i]+'</td><td>'+data[6][i]+'</td><td>'+data[7][i]+'</td><td>'+data[8][i]+'</td></tr>');
    }
    
}