require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');

const { Book } = require('./models/model');

const MONGO_URI = process.env.DB_ADRESS;
const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());

// Post books to DB
app.post('/books', async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      console.log(`Birisi boş 'body' ile POST isteği atmaya çalıştı şuraya -> '${req.path}'`);
      return res.status(400).json({
        message: `Boş 'body' ile POST isteği atamazsınız!`,
        "örnek istek - 'data türüne dikkat edin!'": exampleRequest
      });
    };
    const newBook = new Book({ ...req.body });
    const book = await newBook.save();
    console.log(`Yeni bir kitap başarıyla veritabanında oluşturuldu!\n %j`, book);
    return res.status(201).json({
      Status: '201 - Oluşturuldu',
      message: 'Gönderdiğiniz obje ile veritabanında yeni bir kitap başarıyla oluşturuldu.',
      "Oluşturulan Objeniz": book
    });
  } catch (error) {

    if (error.name == 'ValidationError') { // kullanıcı POST isteği atarken bir yerleri boş bırakırsa...
      let returnMsg = {};
      Object.keys(error.errors).forEach((key) => {
        returnMsg[key] = `<- Yanlış veya eksik değer.`;
      });

      returnMsg['Örnek POST isteği - "data türüne dikkat edin!"'] = exampleRequest;

      return res.status(400).json(returnMsg);
    }
    console.log(`Bir kitabı veritabanına kaydederken bir sorun oluştu.\n ${error}\n`)
    return res.status(400).json({ Status: `${req.path} adresine POST isteği atılırken bir hata oluştu!`, 'hata mesajı': error.message, type: error })
  };
});

// GET all book from DB
app.get('/books', async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json({ 'Bütün kitapların sayısı': allBooks.length, 'Kitaplar': allBooks })
  } catch (error) {
    return res.status(500).json({ Status: 'Veritabanındaki bütün kitapları derlerken bir sorun oluştu!', 'Hata mesajı': error.message })
  }
});

// GET one book from DB
app.get('/books/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        'HATA': 'Gönderilen id geçerli değil!',
        'id': req.params.id
      })
    }
    const singleBookObj = await Book.findById(req.params.id);

    // eğer verilen id geçerli ise, fakat veritabanında böyle bir obje bulunamıyorsa findById() fonksiyonu 'null' dönüyor.
    // bunun için aşağıda ufak bir kontrolle doğru cevabı gönderebiliriz. 
    return singleBookObj ?
      res.status(200).json({
        'İstediğiniz obje bulundu!': { 'Kitap': singleBookObj }
      })
      : res.status(404).json({ 'Hata': 'Verilen id ile veritabanında bir obje bulunamadı', 'id': req.params.id });
  } catch (error) {
    return res.status(500).json({ Status: 'Veritabanından bir adet kitap isterken bir sorun oluştu!', 'Hata mesajı': error.message })
  }
})

exampleRequest = {
  "title": "Kitap adı - string",
  "desc": "Kitabın açıklaması - string",
  "author": "Yazar - string",
  "publishYear": 2010
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI)
      .then(() => console.log('[DB] - Veritabanına bağlanıldı.'))
      .catch((err) => { console.log(`[ERROR] Veritabanına bağlanamadım :/`); throw err });

    app.listen(PORT, () => {
      console.log(`Bi' dakika şef, ateşliyorum... 🔥🔥🔥\nTamamdır, içerdeyiz. Port: ${PORT}`)

    });

  } catch (error) {
    console.log(`[ERROR] While starting the server, check your credentials and try again. Aborting.\n${error}`);
    process.exit(1);
  };
};

startServer();