const mongoose = require("mongoose");
const { Schema } = mongoose;

const Book = mongoose.model(
  "Book",
  new Schema(
    {
      // Kitap Bilgileri
      title: {
        type: String,
        required: [true, "Başlık boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },
      author: {
        type: String,
        required: [true, "Yazar boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },
      description: {
        type: String,
        required: false,
        cast: [false, "Bu değer string olmalıdır"],
      },
      category: {
        type: String,
        required: [true, "Kategori boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },
      language: {
        type: String,
        required: [true, "Dil boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },

      // Yayın Bilgileri
      publicationDate: {
        type: String,
        required: [true, "Basım tarihi boş bırakılamaz"],
        cast: [false, "Basım tarihi String olmalıdır"],
      },
      edition: {
        type: Number,
        required: [true, "Baskı boş bırakılamaz"],
        min: [1, "Baskı numarası en az 1 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      placeOfPublication: {
        type: String,
        required: [true, "Basım yeri boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },

      // Fiziksel Özellikler
      width: {
        type: Number,
        required: [true, "Genişlik boş bırakılamaz"],
        min: [1, "Genişlik en az 1 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      height: {
        type: Number,
        required: [true, "Yükseklik boş bırakılamaz"],
        min: [1, "Yükseklik en az 1 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      pageCount: {
        type: Number,
        required: [true, "Sayfa sayısı boş bırakılamaz"],
        min: [1, "Sayfa sayısı en az 1 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      coverType: {
        type: String,
        required: [true, "Kapak türü boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },
      paperType: {
        type: String,
        required: [true, "Kağıt türü boş bırakılamaz"],
        cast: [false, "Bu değer string olmalıdır"],
      },

      // Stok ve Fiyatlandırma
      barcode: {
        type: Number,
        required: [true, "Barkod boş bırakılamaz"],
        min: [1000000000000, "Barkod 13 hane olmalıdır."],
        max: [9999999999999, "Barkod 13 hane olmalıdır."],
        unique: true,
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      stock: {
        type: Number,
        required: [true, "Stok miktarı boş bırakılamaz"],
        min: [0, "Stok miktarı en az 0 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },
      price: {
        type: Number,
        required: [true, "Fiyat boş bırakılamaz"],
        min: [0, "Fiyat en az 0 olabilir"],
        cast: [false, "Bu değer rakam olmalıdır"],
      },

      // Diğer Bilgiler
      image: {
        type: String,
        required: false,
        cast: [false, "Bu değer string olmalıdır"],
      },
      dateAdded: {
        type: String,
        default: () => new Date().toLocaleString("tr-TR"),
      },
    },
    { timestamps: { createdAt: false, updatedAt: true } },
  ),
);

module.exports = Book;
