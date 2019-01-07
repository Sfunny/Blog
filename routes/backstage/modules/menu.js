var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var menu = new Schema({
    name: String,
    url: String
});
module.exports = mongoose.model('menu', menu);
