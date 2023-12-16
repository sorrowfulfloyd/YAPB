const express = require('express');
const router = express.Router();

const { getOneBook, getAllBooks, postABook, updateBook, deleteBook } = require('../controller/bookController')

router.route('/').get(getAllBooks).post(postABook);
router.route('/:id').get(getOneBook).put(updateBook).delete(deleteBook);

module.exports = router
