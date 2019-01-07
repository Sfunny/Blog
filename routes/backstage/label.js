var express = require('express');
var label = require("./service/label")
var router = express.Router();


router.all("/", function (req, res, next) {
    res.render('backstage/label/labelManagement');
});
router.all("/save", function (req, res, next) {
    var data = req.body;
    label.saveLabel(data, function (err, Json) {
        var msg = "success";
        if (!Json) {
            msg = "error"
        }
        if (err) {
            msg = "error"
        }
        res.json(msg);
    })
});
router.get("/load", function (req, res, next) {
    var data = {
        limit: parseInt(req.query.limit),
        page: parseInt(req.query.page),
    };
    var need = {};
    for (var i in req.query) {
        if (i != 'limit' && i != 'page') {
            var where = req.query[i];
            for (var j in where) {
                need[j] = {
                    $regex: where[j]
                }
            }
        }
    }
    data['need'] = need;
    var result = {
        "code": 0, //解析接口状态
        "msg": "", //解析提示文本
        "count": 0, //解析数据长度
        "data": [] //解析数据列表
    };
    label.getLabel(data, function (err, Json, count) {
        var msg = "success";
        if (err) {
            msg = "error"
        }
        result.data = Json;
        result.count = count;
        result.msg = msg;
        res.json(result);
    })
});
router.all("/delete", function (req, res, next) {
    var data = req.body;
    var list = data['params[]'];
    var need = {
        _id: {
            $in: list
        }
    }
    label.delLabel(need, function (err, Json) {
        var msg = "success";
        if (!Json.n > 0) {
            msg = "error"
        }
        if (err) {
            msg = "error"
        }
        res.json(msg);
    })
});
router.all("/edit", function (req, res, next) {
    var data = req.body;
    label.editLabel(data, function (err, Json) {
        var msg = "success";
        if (!Json) {
            msg = "error"
        }
        if (err) {
            msg = "error"
        }
        res.json(msg);
    })
});
module.exports = router;
