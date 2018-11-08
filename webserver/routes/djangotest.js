const express = require("express");
const router = express.Router();
const axios = require("axios");
const database = require("../lib/DBConnecter.js");

router.get("/", (req, res, next) => {
  console.log("Yeah");
  const uid = req.query.uid;
  console.log(uid);

  axios
    .get("http://192.168.38.229:8000/server", { params: { uid: uid } })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(response => {
      console.log("error", response);
      res.send({ message: "Error" });
    });
});

module.exports = router;
