var express = require('express');
var menu = require('./service/menu');
var blog = require('./service/blog');
var router = express.Router();


router.all("/", function (req, res, next) {
    res.render('backstage/index');
});
router.all("/getAllMenu", function (req, res, next) {
    menu.getByConditions({}, function (err, data) {
        var msg = null;
        if (data.length > 0) {
            msg = "success"
        } else if (data.length < 0) {
            msg = "error"
        } else if (err) {
            msg = "error"
        }
        res.json({msg, data});
    })
});
router.all("/getAllBlog", function (req, res, next) {
    blog.getBlog({}, function (err, data) {
        var msg = null;
        if (data.length > 0) {
            msg = "success"
        } else if (data.length < 0) {
            msg = "error"
        } else if (err) {
            msg = "error"
        }
        res.json({msg, data});
    })
});
module.exports = router;
