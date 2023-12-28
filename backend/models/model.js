const mongoose = require('mongoose');
const { Schema } = mongoose;

const DateLocale = () => new Date().toLocaleString('tr-TR');

const bookSchema =  new Schema({
  title: { type: String, required: [true, 'Kitap adı boş bırakılamaz'] , cast: [false, "Kitap adı string olmalı"]},
  desc: { type: String, required: [true, 'Kitap açıklaması boş bırakılamaz'], cast: [false, "Kitap açıklaması string olmalı"], minLength: [10, "Açıklama en az 10 karakter olmalı."] },
  publisher: { type: String, required: [true, "Yayınevi boş bırakılamaz"], cast: [false, "Yayınevi adı string olmalı"]},
  publishYear: { type: Number, required: [true, 'Basım tarihi boş bıraklamaz'], cast: [false, "Yayınlama yılı sayı olmalı"], min: [0, 'İzin verilen en düşük değer 0'], max: [2024, 'İzin verilen en yüksek değer 2024'] },
  edition: { type: String, cast: [false, 'Baskı sayısı string olmalı'], default: '1' },
  language: { type: String, required: [true, 'Kitap dili boş bırakılamaz'], cast: [false, "Dil string olmalı"], min: [3, 'İzin verilen en düşük değer 3']},
  author: { type: String, cast: [false, "Yazar adı string olmalı"], },
  translator: { type: String, cast: [false, 'Çevirmen adı string olmalı'], },
  isbn: { type: Number, required: [true, 'Barkod numarası boş bırakılamaz'], cast: [false, "Barkod sayı olmalı"], min: [1000000000000, "Barkod 13 hane olmalı"], max: [9999999999999, "Barkod 13 hane olmalı"]},
  stock: { type: Number, required: [true, 'Stok bilgisi boş bırakılamaz'], cast: [false, 'Stok bilgisi sayı olmalı'], min: [0, 'İzin verilen en düşük değer 0']},
  price: {type: Number, required: [true, "Fiyat bilgisi boş bırakılamaz"], cast: [false, "Fiyat sayı olmalı"], min: [5, "5TL'den ucuz kitap olamaz, belki ayraç olabilir ama o da zaten kitap değil."]},  
  dateAdded: { type: String, default: DateLocale() },
  },
    { timestamps: { createdAt: false, updatedAt: true } }
);

bookSchema.pre('validate', function(next) {
  this.language = this.language.charAt(0).toUpperCase() + this.language.slice(1).toLowerCase();
  
  if(this.language === 'Türkçe') {
    if (!this.author) {
      const error = new mongoose.Error.ValidationError(this);
      error.message = 'Yazar adı boş bırakılamaz';
      return next(error);
    }
    if (this.translator !== undefined) {
      const error = new mongoose.Error.ValidationError(this);
      error.message = 'Türkçe kitaplar için çevirmen gerekmez'
      return next(error);
    }
  };

  if(this.language !== 'Türkçe') {
    if (!this.translator) {
      const error = new mongoose.Error.ValidationError(this);
      error.message = 'Yabancı dil kitap için çevirmen adı boş bırakılamaz';
      return next(error);
    }
    if (!this.author) {
      const error = new mongoose.Error.ValidationError(this);
      error.message = 'Yabancı dil kitap için yazar boş bırakılamaz';
      return next(error);
    }
  };

  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book 
