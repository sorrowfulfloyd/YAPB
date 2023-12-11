const express = require('express');
const router = express.Router();

const { getOneBook, getAllBooks, postABook, updateBook, deleteBook } = require('../controller/bookController')

const errorHandler = (err, req, res, next) => {
  console.log(`#HATA# - ${err.message}`);
  res.status(400).json({ hata: err.message })
};

router.route('/').get(getAllBooks).post(postABook);
router.route('/:id').get(getOneBook).put(updateBook).delete(deleteBook);

router.use(errorHandler);

// yanlış yere gönderilen/olmayan bütün requestler için..
router.use((req, res, next) => {
  res.status(404).json({ message: 'Bulunamadı || Yanlış istek türü..' });
});

module.exports = router
