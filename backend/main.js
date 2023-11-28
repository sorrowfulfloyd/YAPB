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
      console.log(`Someone tried to make a POST with empty body to '${req.path}'`);
      return res.status(400).json({
        message: `Can't make POST requests with empty body!`,
        example_request: {
          "title": "Book name",
          "desc": "Short description",
          "author": "Author",
          "publishYear": 1000
        }
      });
    };
    const newBook = new Book({ ...req.body });
    const book = await newBook.save();
    console.log(`Book has been created successfully.\n %j`, book);
    return res.status(201).json({ Status: '201 - Created', message: 'Model is created successfully', bookObj: book });
  } catch (error) {
    console.log(`Something went wrong while trying to save a book object.\n ${error}\n`)
    return res.status(500).json({ Status: '500 - Internal Server Error', message: error.message })
  };
});

// default GET request
app.get('/', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request to '${req.url}' page.`);
  res.status(200).send('<h1>Hello, World!</h1>')
});

// example GET request to a different path
app.get('/products', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request to '${req.url}' page.`);
  res.status(200).send(`<h1>Products page</h1><p>This will be filled soon.</p>`)
});

// example GET request to a different path with added id. This could be used to search items in DB in the future.
app.get('/products/:id', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request with added '${req.params.id}' parameters to '${req.url}' page.`);
  res.status(200).send(`<h1>Example Product page</h1><p>You sent a request for this: ${req.params.id}.</p>`)
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI)
      .then(() => console.log('[DB] - Connected to DB.'))
      .catch((err) => { console.log(`[ERROR] Couldn't connect to DB.`); throw err });

    app.listen(PORT, () => {
      console.log(`[SERVER] - We're in... Port: ${PORT}`)
    });

  } catch (error) {
    console.log(`[ERROR] While starting the server, check your credentials and try again. Aborting.\n${error}`);
    process.exit(1);
  };
};

startServer();