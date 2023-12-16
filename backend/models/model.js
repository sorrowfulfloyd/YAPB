const mongoose = require('mongoose');
const { Schema } = mongoose;

const DateLocate = () => new Date().toLocaleString('tr-TR');

const Book = mongoose.model('Book', new Schema({
  title: {
    type: String,
    required: [true, 'Kitap adı boş bırakılamaz']
    , cast: [false, "Kitap adı string olmak zorunda"]
  },
  desc: { type: String, required: [true, 'Kitap açıklaması boş bırakılamaz'], cast: [false, "Kitap açıklaması string olmak zorunda"] },
  author: { type: String, required: [true, 'Yazar adı boş bırakılamaz'], cast: [false, "Yazar adı string olmak zorunda"] },
  publishYear: { type: Number, required: true, cast: [false, "Yayınlama yılı sayı olmak zorunda"] },
  dateAdded: { type: String, default: DateLocate() }
}));

module.exports = Book 