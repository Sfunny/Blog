var menu = require("../modules/menu.js");


module.exports = {
    getByConditions: function (where, callBack) {
        menu.find(where, callBack);
    }
}
