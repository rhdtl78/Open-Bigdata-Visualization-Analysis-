var express = require('express');
var router = express.Router();
var database = require('../lib/DBConnecter.js');
const axios = require("axios");

router.get('/', function (req, res, next) {
  var uid = req.query.uid;
  const db = new database(uid);
  db.load('tmp', function (data) {
    df = new DataFrame(data);
    seqNames = df.columns;
    //variable
    var variable = new Array();
    seqNames.forEach(function (element) {
      variable.push(element);
    });

    covDf = df.cov();
    var data = new Array();
    variable.forEach(function (element, index) {
      data.push(covDf.get(element).to_json({ orient: 'records' }));
    })

    res.json({ data: data, variable, variable })

  });
});

router.post("/", (req, res) => {
  var uid = req.body.uid;

  axios({
    url: "http://localhost:8000/server/covariance",
    data: {
      uid: uid
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {

      try {

        const cov = JSON.parse(response.data.cov);
        // console.log(rules)
        res.send({data:cov});
      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => {
      console.log("error", error);
    });
});


module.exports = router;
