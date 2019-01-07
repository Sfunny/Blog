var category = require("../modules/category.js");


module.exports = {
    saveCategory: function (data, callBack) {
        var categoryItem = new category({
            name: data.name
        })
        categoryItem.save(callBack);
    },
    getCategory: function (where, callBack) {
        category.countDocuments(where.need, function (err, count) {
            category.find(where.need).skip((where.page - 1) * where.limit).limit(where.limit).exec(function (err, res) {
                callBack(err, res, count);
            });
        })
    },
    delCategory: function (where, callBack) {
        category.deleteMany(where, callBack)
    }, editCategory: function (where, callBack) {
        category.findOneAndUpdate({'_id': where._id}, {$set: where}, callBack);
    }
}
