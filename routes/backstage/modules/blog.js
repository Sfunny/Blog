var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var blog = new Schema({
    title: String,
    img: String,
    time: String,
    content: String,
    labels: Array,
    category: Array
});
module.exports = mongoose.model('blog', blog);
