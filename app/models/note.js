var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('notes', noteSchema);