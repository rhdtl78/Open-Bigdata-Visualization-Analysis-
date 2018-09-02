var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
var summary = require('../lib/summary.js')


router.get('/', function (req, res, next) {

  var expression = req.query.expression;
  expression = expression.replace(/`/gi,"");
  console.log("expression = " +expression)
  var derName = req.query.derName;
  console.log("derName = "+derName)
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    var df = new DataFrame(data);
    seqNames = df.columns;
    var variable = new Array();
    seqNames.forEach(function (element) {
        if(expression.match(element)){
            variable.push(element);            
        }
    });
    console.log("variabe = " + variable)
    var data = new Array();
    variable.forEach(function(element){
        data.push(df.get(element).to_json({orient:"records"}))
    })
    var derData = new Array();
    for(let i =0;i<df.length;i++){
        var tempExp = expression;
        variable.forEach(function(element,index){
            tempExp = tempExp.replace(element,data[index][i])
        })
        //console.log()
        derData.push(parseFloat(eval(tempExp).toFixed(4)));
    }
    var ds = new Series(derData);
    df = df.set(derName,ds);
    db.save(df.to_json({ orient: 'records' }))
    var sumData = summary(df);

    res.json({ data: sumData })

  });

});

module.exports = router;