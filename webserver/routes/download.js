var fs = require('fs');
var express = require('express');
var router = express.Router();
var summary = require("../lib/summary.js");
var showData = require("../lib/showData.js");
var database = require("../lib/DBConnecter.js");


router.get('/', function(req, res, next) {
    // var filename = req.params.id;
    // filepath = __dirname + '/files/' + filename;
    // res.download(filepath);
    
    var uid = req.query.uid;

    const db = new database(uid);
    db.load("tmp", function(data) {
        df = new DataFrame(data);
        var data = df.to_csv();
        var filepath = 'temp/csv_temp.csv';
        fs.writeFileSync(filepath, data, 'utf-8', function(err){
            if(err){
                // 3. 파일생성 중 오류가 발생하면 오류출력
                console.log(e);
            }else{
                // 4. 파일생성 중 오류가 없으면 완료 문자열 출력
                console.log('WRITE DONE!');
            }
        });

        res.download(filepath);
    })
});

module.exports = router;