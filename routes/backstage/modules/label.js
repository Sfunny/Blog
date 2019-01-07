var mongoose = require('../../utils/db.js'),
    Schema = mongoose.Schema;
var label = new Schema({
    name: String
});
module.exports = mongoose.model('label', label);
