const express = require("express");
const router = express.Router();
const summary = require("../lib/summary.js");
const showData = require("../lib/showData.js");
const database = require("../lib/DBConnecter.js");
const axios = require("axios");

router.post("/", (req, res) => {
  const { uid, process, variable } = req.body;
  
  axios({
    url: "http://localhost:8000/server/notavailable",
    data: {
      "uid": uid,
      "process": process,
      "variable": variable
    },
    method: "POST",
    header: { "Content-type": "application/json" }
  })
  .then(response => {
    const snapshot = JSON.parse(response.data.snapshot);
    const df = new DataFrame(snapshot)
    const summ = summary(df)
    const data = showData(df)
    res.json({ "summary": summ, "dataframe": data, "variable": variable });
  })
  .catch(response => {
    console.log(response);
    res.json({ "snapshot": "error" });    
  })
});

module.exports = router;
