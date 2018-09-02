var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
var jsregression = require('js-regression');
var transpose = require('../lib/transpose')


// function transpose(a) {
//   return Object.keys(a[0]).map(function(c) {
//       return a.map(function(r) { return r[c]; });
//   });
// }

router.get('/', function (req, res, next) {
  var uid = req.query.uid;
  var dependent = req.query.dependent;
  var independent = req.query.independent;
  const db = new database(uid);
  db.load('tmp', function (data) {
    var df = new DataFrame(data);
    var data = new Array();
    var depData = new Array();
    var indepData = new Array();
    var variable = new Array();

    dependent.forEach(function(element){
      data.push(df.get(element).to_json({orient:"records"}))
      depData.push(df.get(element).to_json({orient:"records"}))
      variable.push(element);
    })
    independent.forEach(function(element){
      data.push(df.get(element).to_json({orient:"records"}))
      variable.push(element);
    })

    var temp = transpose(data)
    // === Create the linear regression === //
    var regression = new jsregression.LinearRegression({
      // alpha: 0.00000001, // 
		  // lambda: 0.0,
			 //trace: false
    });
    // can also use default configuration: var regression = new jsregression.LinearRegression(); 
    
    // === Train the linear regression === //
    var model = regression.fit(temp);
    console.log(model)
    // === Print the trained model === //
    temp = depData;
    //remove Y
    //temp.pop();
    //console.log(data)
    
    temp = transpose(temp);
    var Y_predicted = regression.transform(temp); 
    //console.log("predi " + Y_predicted)
    res.json({pred:Y_predicted, data:data,variable:variable, model:model})
    // === Testing the trained linear regression === //
    // var testingData = [];
    // for(var x = 1.0; x < 100.0; x += 1.0) {
    //   var actual_y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
    //   var predicted_y = regression.transform([x, x * x]);
    //   console.log("actual: " + actual_y + " predicted: " + predicted_y); 
    // }
    // for(var x = 1.0; x < 100.0; x += 0.5) {
		//   var actual_y = 6.0 + 5.0 * x + 2.0 * x * x  + (Math.random()-0.5) * x * 100;
		//   var predicted_y = regression.transform([x, x * x]);
		//   // items.push({x: x, y: actual_y});
		//   // items_predicted.push({x: x, y: predicted_y});
		//   console.log("actual: " + actual_y + " predicted: " + predicted_y); 
		// }
    
    //var indepDf

    // console.log("++++++++++++++++++++++++++++++pyshell before+++++++++++++++++++")
    // var pyshell = new PythonShell('./python/regression.py', {mode: 'json'});

    // seqNames = df.columns;
    // //variable
   
    // var output = new Array();
    // pyshell.stdout.on('data', function (data) {
    //     output.push(data);
    // });
    // // independent.forEach(function (element) {
    // //     console.log("dep = "+element)
    // //     pyshell.send(df.get(element))
    // // })
    // // dependent.forEach(function(element){
    // //     //depDf=depDf.set(element,df.get(element))
    // //     console.log("indep = "+element)        
    // //     pyshell.send(df.get(element))
    // // })
    // pyshell.send(df.to_json({orient: 'values'}))
    
    // pyshell.end(function(err){
    //     if (err) return console.log("python "+err);
    //     console.log("output is "+output)
    // })
    
  
    // console.log("stop1")
    // for(i=0;i<dependent.length;i++){
        
    // }
    // pyshell.send(depDf.to_json({orient: 'records'})).send(indepDf.to_json({orient: 'records'})).end(function (err) {
    //     if (err) return console.log("py error is "+err);
    //     //output.should.be.exactly('{"a": "b"}'+newline+'null'+newline+'[1, 2, 3]'+newline);
    //     console.log("output is "+output)
    // });
    // console.log("stop2")
    // var data = new Array();
    // select.forEach(function (element, index) {
    //   data.push(corrDf.get(element).to_json({ orient: 'records' }));
    // })
   
  });
});

module.exports = router;