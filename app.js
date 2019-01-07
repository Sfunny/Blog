var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var debug = require('debug')('blog:server');
var path = require('path');
var helmet = require('helmet');
var lessMiddleware = require('less-middleware');
var createError = require('http-errors');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

//配置
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.set('port', port);

//路由
var Reception_Index = require("./routes/reception/index");
app.use('/', Reception_Index);
var Backstage_Login = require("./routes/backstage/login");
app.use('/admin', Backstage_Login);
var Backstage_Index = require("./routes/backstage/index");
app.use('/backstage', Backstage_Index);
var Backstage_Label = require("./routes/backstage/label")
app.use('/backstage/label', Backstage_Label);
var Backstage_Category = require("./routes/backstage/category");
app.use('/backstage/category', Backstage_Category);
var Backstage_Blog = require("./routes/backstage/blog");
app.use('/backstage/blog', Backstage_Blog);
var Backstage_Upload = require("./routes/backstage/upload");
app.use('/backstage/upload', Backstage_Upload);
var Backstage_Image = require("./routes/backstage/image");
app.use('/backstage/image', Backstage_Image);

app.listen(7758, '0.0.0.0', function (err) {
    if (err) {
    } else {
        console.log("系统启动:端口" + 7758);
    }
});
module.exports = app;
