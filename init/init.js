// var mongo = require("mongodb"); //引入mongodb模块
// var assert = require("assert"); //引入断言模块
var fs = require("fs");
var data = null;
try {
    data = fs.readFileSync("init.json");
} catch (err) {
    console.error("读取初始化文件(init.json)失败");
    return;
}
data = JSON.parse(data);
if (!data) {
    return;
}
{
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    /*管理员*/
    var Admin = new Schema({
        'userName': String,
        'passWord': String
    });
    /*菜单*/
    var Menu = new Schema({
        'name': String,
        'url': String
    });
    var Admin = mongoose.model('admin', Admin);
    var Menu = mongoose.model('Menu', Menu);
    mongoose.connect(data.db, {
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 500ms
        useNewUrlParser: true
    });

    mongoose.connection.on('connected', function () {
        console.info("连接数据库成功");
        init();
    });
    mongoose.connection.on('error', function () {
        console.error("连接数据库失败");
    });
}
{
    var init = function () {
        initDoc(Admin, data.admin, "管理员", "admin");
        initDoc(Menu, data.menu, "菜单", "menu");
        setTimeout(function () {
            process.exit();
            console.log("退出");
        }, 120000);
    };
    var initDoc = function (Model, list, model_name, index_key) {
        if (!list) {
            return;
        }
        Model.deleteMany({}, function (err) {
            if (err) {
                console.error("初始化" + model_name + "数据失败");
                return;
            }
            Model.insertMany(list, function (err) {
                if (err) {
                    console.error("初始化" + model_name + "数据失败");
                    return;
                }
                console.log("初始化" + model_name + "数据成功");
            });
        });
    }
}
// var MongoClient = mongo.MongoClient;  //开启服务
