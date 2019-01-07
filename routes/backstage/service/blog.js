var blog = require("../modules/blog.js");


module.exports = {
    saveBlog: function (data, callBack) {
        var blogItem = new blog({
            title: data.name,
            img: data.imgSrc,
            time: new Date().getTime(),
            content: data.content,
            labels: data['labels[]'],
            category: data['category[]']
        })
        blogItem.save(callBack);
    },
    getBlog: function (where, callBack) {
        if (where.method == "get") {
            blog.countDocuments(where.need, function (err, count) {
                blog.find(where.need).skip((where.page - 1) * where.limit).limit(where.limit).exec(function (err, res) {
                    callBack(err, res, count);
                });
            })
        } else {
            blog.find(where.need, callBack);
        }

    },
    delBlog: function (where, callBack) {
        blog.deleteMany(where, callBack)
    }, editBlog: function (where, callBack) {
        blog.findOneAndUpdate({'_id': where._id}, {$set: where}, callBack);
    }
}
