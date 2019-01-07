var express = require('express');
var fs = require("fs");
var multer = require('multer');
var image = require("./service/image");
var router = express.Router();
var upload = multer({dest: './public/upload/img'});


router.all("/uploadImg", upload.any(), function (req, res, next) {
    var uploadImgMsg = {};
    var sevaMsg = "";
    try {
        var name = new Date().getTime() + req.files[0].originalname;
        //设置文件路径
        var des_file = "./public/upload/img/" + name
        fs.readFile(req.files[0].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                if (err) {
                    res.json({"result": "error", "msg": err});
                } else {
                    var data = {
                        name: req.files[0].originalname,
                        path: des_file
                    }
                    image.saveImg(data, function (err, result) {
                        if (err) {
                            res.json({"result": "error", "msg": err});
                        } else {
                            var r = {
                                declarations: result.declarations,
                                height: result.height,
                                name: result.name,
                                src: result.path.substring(8, result.path.length),
                                time: result.time,
                                width: result.width,
                                __v: result.__v,
                                _id: result._id,
                            }
                            res.json({"result": "success", "data": r});
                        }
                    });
                }
            });
        });
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;
