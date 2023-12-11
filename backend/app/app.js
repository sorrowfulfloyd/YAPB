const express = require('express');
const app = express();
const bookRoute = require('../routes/book');

app.use(express.json());
app.use('/api/v1/books', bookRoute);

module.exports = app;