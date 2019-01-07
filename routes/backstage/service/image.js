var image = require("../modules/image.js");

module.exports = {
    saveImg: function (data, callBack) {
        var imageItem = new image({
            name: data.name,
            path: data.path,
            time: new Date().getTime(),
            declarations: (data.declarations) ? data.declarations : "",
            width: (data.width) ? data.width : "",
            height: (data.height) ? data.height : ""
        })
        imageItem.save(callBack);
    }
}
