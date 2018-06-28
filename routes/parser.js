var express = require('express');
var router = express.Router();

router.get('/csv', function (req, res, next) {
  var fileName = req.query.name;
  var path = req._parsedUrl.pathname;
  var fullPath = path + "/" + fileName;

  
});

module.exports = router;
