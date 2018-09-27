var express = require('express');
var router = express.Router();
var summary = require('../lib/summary.js')
var showData = require('../lib/showData.js')
var database = require('../lib/DBConnecter.js');

router.get('/', function (req, res, next) {
  var minArray = req.query.minArray;
  var maxArray = req.query.maxArray;
  var seqNames = req.query.variableArray;
  var variable = new Array();
  seqNames.forEach(function(element){
    if(element!=""){
      variable.push(element)
    }
  })
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data)    
    //selected variable
    //var variable = new Array();
    //seqNames = df.columns;
    //variable
    
    // seqNames.forEach(function (element) {
    //   if(element == "dtype(int)"||element == "dtype(float)"){
    //     variable.push(element);
    //   }
    // });
    if (minArray != null) {
      minArray.forEach(function (element, index) {
        if (element != "") {
          df = df.filter(df.get(variable[index]).gt(element));
        }
      });
    }
    if (maxArray != null) {
      maxArray.forEach(function (element, index) {
        if (element != "") {
          df = df.filter(df.get(variable[index]).lt(element));
        }
      });
    }
    db.save(df.to_json({ orient: 'records' }))

    var data = summary(df)
    var data2 = showData(df)
    
    res.json({ data: data,
      data2:data2,
      variable:df.columns
     })
  });

});
router.get('/modal', function (req, res, next) {

  var uid = req.query.uid;
  // console.log("uid = "+uid)
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data)
    seqNames = df.columns;

    var variable = new Array();
    var data = new Array();
    seqNames.forEach(function (element) {
      if(df.get(element).dtype.toString()=="dtype(int)" || df.get(element).dtype.toString()=="dtype(float)" ){
          variable.push(element);
          data.push(df.get(element).to_json({ orient: 'records' }))
      }
    });

    res.json({ variable: variable, data: data })
  });


});

module.exports = router;
