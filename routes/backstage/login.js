var express = require('express');
var admin = require('./service/admin');
var router = express.Router();


router.all("/", function (req, res, next) {
    res.render('backstage/login');
});
router.all("/doLogin", function (req, res, next) {
    var where = req.body;
    admin.getByConditions(where, function (msg) {
        res.json(msg);
    });
});
module.exports = router;
