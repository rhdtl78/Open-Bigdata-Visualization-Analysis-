var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('manual', { title: "OBVA's Manuals" });
});

module.exports = router;
