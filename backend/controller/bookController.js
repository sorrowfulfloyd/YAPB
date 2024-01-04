const Book = require('../models/model')
const replaceTurkishChars = require('../helpers/replaceTurkishChars')

const getOneBook = async (req, res) => {
  const singleBookObj = await Book.findById(req.params.id);

  return singleBookObj ?
    res.status(200).json({
      'İstediğiniz obje bulundu!': { Kitap: singleBookObj }
    })
    : res.status(404).json({ Error: 'Verilen id ile veritabanında bir obje bulunamadı', id: req.params.id });
}

const getAllBooks = async (req, res) => {
  const {title, author} = req.query;
  const newQuery = {}

  if (title) {
     newQuery.title = replaceTurkishChars(title);
  }

  if (author) {
    newQuery.author = replaceTurkishChars(author);
  }

  const page = Number(req.query.params) || 1;
  const limit = Number(req.query.params) || 99;
  const skipCount = (page - 1) * limit;
  
  console.log(newQuery)  

  const allBooks = await Book.find(newQuery).skip(skipCount).limit(limit);
  return res.status(200).json({ 'Bütün kitapların sayısı': allBooks.length, Kitaplar: allBooks })
}

const postABook = async (req, res) => {

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

module.exports = { getOneBook, getAllBooks, postABook, updateBook, deleteBook }
