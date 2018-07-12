var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');

router.get('/', function (req, res, next) {
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data);
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
});

module.exports = router;