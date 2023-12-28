const Book = require('../models/model')

const getOneBook = async (req, res) => {
  const singleBookObj = await Book.findById(req.params.id);

  return singleBookObj ?
    res.status(200).json({
      'İstediğiniz obje bulundu!': { Kitap: singleBookObj }
    })
    : res.status(404).json({Error: 'Verilen id ile veritabanında bir obje bulunamadı', id: req.params.id });
}

const getAllBooks = async (req, res) => {
  const page = Number(req.query.params) || 1;
  const limit = Number(req.query.params) || 10;
  const skipCount = (page - 1) * limit;

  const allBooks = await Book.find({}).skip(skipCount).limit(limit);
  return res.status(200).json({ 'Bütün kitapların sayısı': allBooks.length, Kitaplar: allBooks })
}

const postABook = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({ message: "Request body'si boş.", "örnek istek": exampleRequest })
  }

  const newBook = new Book({ ...req.body });
  const book = await newBook.save();

  return res.status(201).json({
    Status: '201 - Oluşturuldu',
    message: 'Gönderdiğiniz obje ile veritabanında yeni bir kitap başarıyla oluşturuldu.',
    "Oluşturulan Objeniz": book
  });
}

const updateBook = async (req, res) => {

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  return book
    ? res.status(200).json({ message: "Kitap objesi başarıyla güncellendi", yeniObje: book })
    : res.status(404).json({ message: "Böyle bir obje bulunamadı", "örnek obje isteği": exampleRequest });
}

const deleteBook = async (req, res) => {

  const book = await Book.findByIdAndDelete(req.params.id);

  return book
    ? res.status(200).json({ message: "Gönderdiğiniz id ile bulunan obje başarıyla silindi." })
    : res.status(404).json({ message: "Verilen id ile bir obje bulunamadı", id: req.params.id })
}

exampleRequest = {
  title: "Kitap adı - string",
  desc: "Kitabın açıklaması - string",
  publisher: 'Yayınevi -string',
  publishYear: 'Yayın yılı - number',
  edition: 'Baskı sayısı - string [ZORUNLU DEĞİL]',
  language: 'Kitap dili - string',
  author: "Yazar (kitabın dili Türkçe ise) - string",
  translator: 'Çevirmen (kitabın dili Türkçe değilse) - string',
  isbn: 'Barkod numarası - number [13 HANE]',
  stock: 'Stok bilgisi - number',
  price: 'Fiyat bilgisi - number'
}

module.exports = { getOneBook, getAllBooks, postABook, updateBook, deleteBook }
