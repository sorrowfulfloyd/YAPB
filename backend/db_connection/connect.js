const mongoose = require('mongoose')

const connectToDB = (URI) => {
  try {
    return mongoose.connect(URI)
  } catch (error) {
    return error
  }
}

module.exports = connectToDB