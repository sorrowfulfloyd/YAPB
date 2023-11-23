const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config;

const MONGO_DB = mongoose.connect("mongodb+srv://root:asdass123@repairme.qimluao.mongodb.net/main?retryWrites=true&w=majority")

const PORT = process.env.PORT || 5500;

const app = express();

// default GET request
app.get('/', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request to '${req.url}' page.`);
  res.status(200).send('<h1>Hello, World!</h1>')
})

// example GET request to a different path
app.get('/products', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request to '${req.url}' page.`);
  res.status(200).send(`<h1>Products page</h1><p>This will be filled soon.</p>`)
})

// example GET request to a different path with added id. This could be used to search items in DB in the future.
app.get('/products/:id', (req, res) => {
  console.log(`[STATUS] - Recieved a ${req.method} request with added '${req.params.id}' parameters to '${req.url}' page.`);
  res.status(200).send(`<h1>Example Product page</h1><p>You sent a request for this: ${req.params.id}.</p>`)
})


const startServer = async () => {
  try {
    await MONGO_DB
      .then(() => console.log('[DB] - Connected to DB.'))
      .catch((err) => { console.log(`[ERROR] Couldn't connect to DB.`); throw err });

    app.listen(PORT, () => {
      console.log(`[SERVER] - We're in... Port: ${PORT}`)
    })

  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
}

startServer()