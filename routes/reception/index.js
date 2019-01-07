var express = require('express');
var router = express.Router();

router.all("/", function (req, res, next) {
    res.render('reception/index', {title: 'Express'});
});
router.all("/loadBlodById/:id", function (req, res, next) {
    res.render('reception/blog', {id: req.params.id});
});
module.exports = router;
