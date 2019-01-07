var label = require("../modules/label.js");


module.exports = {
    saveLabel: function (data, callBack) {
        var labelItem = new label({
            name: data.name
        })
        labelItem.save(callBack);
    },
    getLabel: function (where, callBack) {
        label.countDocuments(where.need, function (err, count) {
            label.find(where.need).skip((where.page - 1) * where.limit).limit(where.limit).exec(function (err, res) {
                callBack(err, res, count);
            });
        })
    },
    delLabel: function (where, callBack) {
        label.deleteMany(where, callBack)
    }, editLabel: function (where, callBack) {
        label.findOneAndUpdate({'_id': where._id}, {$set: where}, callBack);
    }
}
