var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var category = new Schema({
    name: String
});
module.exports = mongoose.model('category', category);
