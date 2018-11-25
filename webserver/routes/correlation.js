var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
const axios = require("axios");

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

router.post("/", (req, res) => {
  var uid = req.body.uid;
  var select = req.body.select;

  axios({
    url: "http://localhost:8000/server/correlation",
    data: {
      uid: uid,
      select: select
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {

      try {

        const corr = JSON.parse(response.data.corr);
        // console.log(rules)
        res.send({corr:corr,variable:select});
      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
});

module.exports = router;
