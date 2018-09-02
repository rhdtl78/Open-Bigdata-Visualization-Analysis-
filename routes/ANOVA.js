var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
//var summary = require('../lib/summary.js')
var anova = require('anova');


router.get('/', function (req, res, next) {

  var select = req.query.colSelect;
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    var df = new DataFrame(data);
    var data = new Array();

    select.forEach(function(element){
      data.push(df.get(element).to_json({orient:'records'}))
    })
    console.log(anova.table(data));
    data = anova.table(data);
    res.json({ data: data })

  });

});

module.exports = router;