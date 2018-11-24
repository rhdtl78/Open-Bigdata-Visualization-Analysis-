var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
//var summary = require('../lib/summary.js')
var anova = require('anova');
const axios = require("axios");

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

router.post("/", (req, res) => {
  var uid = req.body.uid;
  var dependent = req.body.dependent;
  var independent = req.body.independent;
  axios({
    url: "http://localhost:8000/server/anova",
    data: {
      uid: uid,
      dependent: dependent,
      independent: independent
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {

      try {
        const result = JSON.parse(response.data.result.toString('utf-8'));
        // console.log(rules)
        res.send({result:result});
      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
});

module.exports = router;
