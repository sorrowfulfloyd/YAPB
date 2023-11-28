const mongoose = require('mongoose');
const { Schema } = mongoose;

const DateLocate = () => new Date().toLocaleString('tr-TR');

const Book = mongoose.model('Book', new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  author: { type: String, required: true },
  publishYear: { type: Number, required: true },
  dateAdded: { type: String, default: DateLocate() }
}));

module.exports = { Book }