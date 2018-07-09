var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  var xVar = req.query.xVar;
  var yVar = req.query.yVar;
  var type = req.query.type;
  const df = dataframe.copy();
  //selected variable
  var variable = new Array();
  var Xdata = new Array();
  var Ydata = new Array();
  if (xVar != null) {
    xVar.forEach(function (element) {
      Xdata.push(df.get(element).to_json({ orient: 'records' }))
    });
  }
  if (yVar != null) {
    yVar.forEach(function (element) {
      variable.push(element);
      Ydata.push(df.get(element).to_json({ orient: 'records' }))
    });
  }

  res.json({ Xdata: Xdata, Ydata: Ydata, variable: variable, type: type })
});

module.exports = router;