var express = require("express");
var router = express.Router();
var database = require("../lib/DBConnecter.js");
var summary = require("../lib/summary.js");
var showData = require("../lib/showData.js");
const axios = require("axios");

router.get("/", function(req, res, next) {
  var select = req.query.colSelect;
  var uid = req.query.uid;
  const db = new database(uid);
  db.load("tmp", function(data) {
    var df = new DataFrame(data);
    var tempDf = new DataFrame();

    select.forEach(function(element) {
      tempDf = tempDf.set(element, df.get(element));
    });

    db.save(tempDf.to_json({ orient: "records" }));
    var data = summary(tempDf);
    var data2 = showData(tempDf);

    res.json({
      data: data,
      data2: data2,
      variable: tempDf.columns
    });
  });
});

router.post("/", async (req, res) => {
  const { colSelect, uid } = req.body;
  console.log(colSelect, uid);

  const db = new database(uid);

  axios
    .post("http://localhost:8000/server/removeColumns", {
      colSelect,
      colSelect,
      uid: uid
    })
    .then(response => {
      const data = JSON.parse(response.data);

      console.log(data);

      db.save(data);
      const df = new DataFrame(data);
      const summaryData = summary(df);
      const sd = showData(df);
      res.json({ data: summaryData, data2: sd, variable: df.columns });
    }).catch(error => {
      console.log(error);
      
    });
});

module.exports = router;
