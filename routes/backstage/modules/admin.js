/**  修改上述 admin.js
 * 用户信息
 */
var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var admin = new Schema({
    userName: String,                    //用户账号
    passWord: String,                        //密码
    logindate: String                       //最近登录时间
});
module.exports = mongoose.model('admin', admin);
