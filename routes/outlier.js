var express = require('express');
var router = express.Router();
var dataSum = require('./dataSummary')

router.get('/', function (req, res, next) {
  var minArray = req.query.minArray;
  var maxArray = req.query.maxArray;
  df = new DataFrame();
  df = dataframe.copy();
  //selected variable
  var variable = new Array();
  seqNames = df.columns;
  //variable
  var variable = new Array();
  seqNames.forEach(function (element) {
    variable.push(element);
  });
  if (minArray != null) {
    minArray.forEach(function (element, index) {
      if (element > 0) {
        df = df.filter(df.get(variable[index]).gt(element));
      }
    });
  }
  if (maxArray != null) {
    maxArray.forEach(function (element, index) {
      if (element > 0) {
        df = df.filter(df.get(variable[index]).lt(element));
      }
    });
  }
  dataframe = df.copy();

  var data = dataSum.dataSummary(df)
  res.json({ data: data })

});
router.get('/modal', function (req, res, next) {

  const df = dataframe.copy();
  seqNames = df.columns;

  var variable = new Array();
  var data = new Array();
  seqNames.forEach(function (element) {
    variable.push(element);
    data.push(df.get(element).to_json({ orient: 'records' }))
  });

  res.json({ variable: variable, data: data })

});

module.exports = router;