var express = require('express');
var router = express.Router();
var database = require('./DBConnecter.js');

router.get('/', function (req, res, next) {

  var xVar = req.query.xVar;
  var yVar = req.query.yVar;
  var type = req.query.type;
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data);
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

  //selected variable

});

module.exports = router;