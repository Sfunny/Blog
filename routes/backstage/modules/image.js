var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var image = new Schema({
    name: String,
    path: String,
    time: String,
    declarations: String,
    width: String,
    height: String
});
module.exports = mongoose.model('image', image);
