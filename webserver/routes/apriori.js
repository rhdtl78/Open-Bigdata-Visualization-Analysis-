var express = require('express');
var Apriori = require('../lib/apriori');
var transpose = require('../lib/transpose')
var router = express.Router();
var database = require('../lib/DBConnecter.js');
const axios = require("axios");


router.get('/', function (req, res, next) {
    var uid = req.query.uid;
    var select = req.query.variableArray;
    var minSupport = req.query.minSup;
    var minConfidence = req.query.minCon;

    const db = new database(uid);
    var temp = new Array();
    db.load('tmp', function (data) {
        var df = new DataFrame(data);
        select.forEach(function(element){
            temp.push(df.get(element).to_json({ orient: 'records' }))
        })
        temp = transpose(temp);
        //var transactions = Apriori.ArrayUtils.readCSVToArray(csv);
        var apriori = new Apriori.Algorithm(minSupport, minConfidence);
        var result = apriori.analyze(temp);

        res.send({result:result})
        //assert.equal(5, result.associationRules.length);

    });
});

router.post("/", (req, res) => {
  var uid = req.body.uid;
  var select = req.body.variableArray;
  var support = req.body.minSup;
  var confidence = req.body.minCon;
  axios({
    url: "http://localhost:8000/server/apriori",
    data: {
      uid: uid,
      select: select,
      support: support,
      confidence: confidence
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {

      try {

        const rules = JSON.parse(response.data.rules.toString('utf-8'));
        // console.log(rules)
        res.send({rules:rules});
      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
});

module.exports = router;
