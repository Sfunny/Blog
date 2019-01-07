var express = require('express');
var blog = require("./service/blog.js");
var router = express.Router();


router.all("/", function (req, res, next) {
    res.render('backstage/blog/blogManagement');
});
router.all("/addBlog", function (req, res, next) {
    res.render('backstage/blog/addBlog');
});
router.all("/save", function (req, res, next) {
    var data = req.body;
    blog.saveBlog(data, function (err, Json) {
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
router.all("/load", function (req, res, next) {
    var data = {};
    if (req.method == 'get') {
        var data = {
            limit: parseInt(req.query.limit),
            page: parseInt(req.query.page),
            method: "get"
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
    } else {
        data['need'] = req.body;
        data.method = "post"
    }
    var result = {
        "code": 0, //解析接口状态
        "msg": "", //解析提示文本
        "count": 0, //解析数据长度
        "data": [] //解析数据列表
    };
    blog.getBlog(data, function (err, Json, count) {
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
    blog.delBlog(need, function (err, Json) {
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
    blog.editBlog(data, function (err, Json) {
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
