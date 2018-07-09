var dataSummary = function (df) {
  seqNames = df.columns;

  var variable = new Array();
  var max = new Array();
  var min = new Array();
  var mean = new Array();
  var median = new Array();
  var dtype = new Array();
  var NAcount = new Array();
  var total = new Array();
  var example = new Array();

  seqNames.forEach(function (element) {
    series = df.get(element)//.to_json({orient: 'records'});

    variable.push(element);
    max.push(series.cummax().tail(1).values)
    min.push(series.cummin().tail(1).values)
    mean.push(series.mean().toFixed(2))
    if (series.dtype.toString() != "dtype(object)") {
      median.push(series.median().toFixed(2))
    } else {
      median.push(series.median())
    }
    dtype.push(series.dtype.toString());
    let count = 0;
    series.forEach(function (current) { if (current == '') { return count++; } return; })
    NAcount.push(count)
    total.push(series.length)
    let ex = ""
    tempExample = series.unique();

    tempExample.every(function (element, index) {
      ex += element + ", ";
      if (index > 1) {
        return false;
      } else {
        return true;
      }
    })
    ex = ex.slice(0, -2);
    example.push(ex);

  });




  var data = new Array();
  data.push(variable)
  data.push(dtype)
  data.push(mean)
  data.push(median)
  data.push(min)
  data.push(max)
  data.push(NAcount)
  data.push(total)
  data.push(example)
  return data;
};

module.exports = {
  dataSummary: dataSummary,
}