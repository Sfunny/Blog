var express = require('express');
var fs = require("fs");
var multer = require('multer');
var router = express.Router();
var upload = multer({dest: '/public/upload/img'});
// router.all("/uploadImg", upload.any(), function (req, res, next) {
//     // req.files[0].originalname; 设置文件名
//     var name = new Date().getTime() + req.files[0].originalname;
//     //设置文件路径
//     var des_file = "/public/upload/img/" + name
//     fs.readFile(req.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//             if (err) {
//                 res.json({"result": "error", "msg": err});
//             } else {
//                 res.json({"result": "success", "msg": des_file});
//             }
//         });
//     });
// })

module.exports = router;
