const express = require('express');
require('express-async-errors')
const app = express();
const bookRoute = require('../routes/book');

const notFound = require('../middleware/notFound');
const errorHandler = require('../middleware/errorHandler')

app.use(express.json());
app.use('/api/v1/books', bookRoute);
app.use(errorHandler);
app.use(notFound);

module.exports = app;