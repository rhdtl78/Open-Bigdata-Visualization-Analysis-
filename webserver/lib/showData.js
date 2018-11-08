var express = require('express');

module.exports = function showData(df){
    var data2Row = df.length
    var data2Col = 0;
    df.columns.forEach(function(element){
      data2Col++;
    })

    if(data2Row>1000){
      var df2 = df.iloc([0, 1000], [0, data2Col]);
      var data2 = df2.to_json({orient: 'values'});
    } else{
      var data2 = df.to_json({orient: 'values'});
    }
    return data2;
}