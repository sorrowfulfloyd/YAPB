const mongoose = require('mongoose');
const { Schema } = mongoose;

const DateLocate = () => new Date().toLocaleString('tr-TR');

const Book = mongoose.model('Book', new Schema({
  title: { type: String, required: true, cast: false },
  desc: { type: String, required: true, cast: false },
  author: { type: String, required: true, cast: false },
  publishYear: { type: Number, required: true, cast: false },
  dateAdded: { type: String, default: DateLocate() }
}));

module.exports = { Book }