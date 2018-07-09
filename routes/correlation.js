var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const df = dataframe.copy();
  seqNames = df.columns;
  //variable
  var variable = new Array();
  seqNames.forEach(function (element) {
    variable.push(element);
  });

  corrDf = df.corr();
  var data = new Array();
  variable.forEach(function (element, index) {
    data.push(corrDf.get(element).to_json({ orient: 'records' }));
  })
  res.json({ data: data, variable, variable })


});

module.exports = router;