var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
var summary = require('../lib/summary.js')


router.get('/', function (req, res, next) {

  var select = req.query.colSelect;
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    var df = new DataFrame(data);
    var tempDf = new DataFrame();

    select.forEach(function(element){
      tempDf=tempDf.set(element,df.get(element))
    })

    db.save(tempDf.to_json({ orient: 'records' }))
    var data = summary(tempDf);
    res.json({ data: data })

  });

});

module.exports = router;