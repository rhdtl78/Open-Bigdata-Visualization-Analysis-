var express = require('express');
var router = express.Router();
var dataSum = require('./dataSummary')
var database = require('./transaction.js');

router.get('/modal', function (req, res, next) {
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data)
    variable = req.query.variable;
    data = df.get(variable).to_json({ orient: 'records' })

    res.json({ variable: variable, data: data })
  });
});

router.get('/', function (req, res, next) {
  var yRange = req.query.yRange;
  var name = req.query.variable;
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    //selected variable
    var variable = new Array();
    seqNames = df.columns;
    //variable
    var variable = new Array();
    seqNames.forEach(function (element) {
      variable.push(element);
    });

    variable.forEach(function (element, index) {
      if (element == name) {
        df = df.filter(df.get(variable[index]).gte(yRange[0]));
        df = df.filter(df.get(variable[index]).lte(yRange[1]));
      }
    });
    db.save(df.to_json({ orient: 'records' }))
    var data = dataSum.dataSummary(df);
    res.json({ data: data })
  });

});


module.exports = router;