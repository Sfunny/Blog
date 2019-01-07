var admin = require("../modules/admin.js");


module.exports = {
    getByConditions: function (where, callBack) {
        admin.find({'userName': where.userName}, function (err, res) {
                var msg = null;
                if (res.length > 0) {
                    for (var i in res) {
                        if (res[i].passWord === where.passWord) {
                            msg = "success"
                        } else {
                            msg = "密码错误"
                        }
                    }
                } else if (res.length < 0) {
                    msg = "账号或密码不正确"
                } else if (err) {
                    msg = "error"
                }
                callBack(msg);
            }
        )
    }
}
