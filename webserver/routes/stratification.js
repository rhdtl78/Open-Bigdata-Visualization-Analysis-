var express = require('express');
var router = express.Router();
var summary = require('../lib/summary.js')
var showData = require('../lib/showData.js')
var database = require('../lib/DBConnecter.js');
const axios = require("axios");

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
  var xRange = req.query.xRange;
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
        var start = parseInt(xRange[0]);
        var end = parseInt(xRange[1]);

        var strDf = df.get(element);
        var strArray = new Array();
        strDf.forEach(function (current,index) {
          if (start<=index && index<=end) {
             strArray.push(true)
            } else {
              strArray.push(false)
            };
        });
        df = df.filter(strArray)

        df = df.filter(df.get(variable[index]).gte(yRange[0]));
        df = df.filter(df.get(variable[index]).lte(yRange[1]));
      }
    });
    db.save(df.to_json({ orient: 'records' }))
    var data = summary(df);
    var data2 = showData(df)

          res.json({
            data: data,
            data2:data2,
            variable:df.columns
          })
  });

});


router.post("/", (req, res) => {
  var uid = req.body.uid;
  var yRange = req.body.yRange;
  var xRange = req.body.xRange;
  var name = req.body.variable;
  const db = new database(uid);
  axios({
    url: "http://localhost:8000/server/stratification",
    data: {
      uid: uid,
      yRange:yRange,
      xRange:xRange,
      name:name
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {

      try {

        const data = JSON.parse(response.data.snapshot);
        db.save(data)
        const df = new DataFrame(data);
        // console.log(df);

        const data1 = summary(df);
        const data2 = showData(df);

        // console.log(rules)
        res.send({data:data1,data2:data2,variable:df.columns});
      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
});


module.exports = router;
