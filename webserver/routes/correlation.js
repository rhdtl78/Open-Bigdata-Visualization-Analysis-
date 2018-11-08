var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');

router.get('/', function (req, res, next) {
  var uid = req.query.uid;
  var select = req.query.select;
  const db = new database(uid);
  db.load('tmp', function (data) {
    var df = new DataFrame(data);
    var tempDf = new DataFrame();
    
    select.forEach(function(element){
      tempDf=tempDf.set(element,df.get(element))
    })
    var corrDf = tempDf.corr();
    var data = new Array();
    select.forEach(function (element, index) {
      data.push(corrDf.get(element).to_json({ orient: 'records' }));
    })
    res.json({ data: data, variable: select })
  });
});

module.exports = router;