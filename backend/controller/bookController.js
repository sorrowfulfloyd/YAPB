const Book = require('../models/model')

const getOneBook = async (req, res) => {
  const singleBookObj = await Book.findById(req.params.id);

  return singleBookObj ?
    res.status(200).json({
      'İstediğiniz obje bulundu!': { 'Kitap': singleBookObj }
    })
    : res.status(404).json({ 'Hata': 'Verilen id ile veritabanında bir obje bulunamadı', 'id': req.params.id });
}

const getAllBooks = async (req, res) => {
  const allBooks = await Book.find();
  return res.status(200).json({ 'Bütün kitapların sayısı': allBooks.length, 'Kitaplar': allBooks })
}

const postABook = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({ message: "Request body'si boş.", "örnek istek": exampleRequest })
  }

  const newBook = new Book({ ...req.body });
  const book = await newBook.save();

  console.log(`Yeni bir kitap başarıyla veritabanında oluşturuldu!\n %j`, book);
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
  "title": "Kitap adı - string",
  "desc": "Kitabın açıklaması - string",
  "author": "Yazar - string",
  "publishYear": 2010
}

module.exports = { getOneBook, getAllBooks, postABook, updateBook, deleteBook }