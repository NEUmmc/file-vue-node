var db = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
var multer = require('multer')
var moment = require('moment')
var fs = require('fs')

var conn = mysql.createConnection(db.mysql);

conn.connect();

const storage = multer.diskStorage({
    //存储的位置
    destination(req, file, cb) {
        cb(null, 'upload/')
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

router.post('/up', upload.single('file'), (req, res) => {
    var sql = $sql.file.insert;
    const name = req.file.filename
    const time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    conn.query(sql, [name, time], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

router.get('/down', (req, res) => {
    var filename = req.query.filename
    var file = 'upload/'+filename;
    
    res.set({
        "Access-Control-Allow-Origin":"*",
        "Content-type":"application/octet-stream", //告诉浏览器这是一个二进制文件
        "Content-Disposition":"attachment;filename="+encodeURI(filename)//确定文件名，告诉浏览器这是需要下载的文件
    });
    fReadStream = fs.createReadStream(file);//得到文件输入流
    fReadStream.pipe(res)// 通过管道方式写入

});

router.post('/getFile', (req, res) => {
    var sql = $sql.file.select;
    var data = req.body
    conn.query(sql,(err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

module.exports = router;