require('dotenv').config()
const connectToDB = require('./db_connection/connect')
const app = require('./app/app')

const DB_ADDRESS = process.env.DB_ADDRESS;
const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectToDB(DB_ADDRESS);
    app.listen(PORT, () => {
      console.log(`Bi' dakika şef, ateşliyorum... 🔥🔥🔥\nTamamdır, içerdeyiz. Port: ${PORT}`)

    });

  } catch (error) {
    console.log(`[ERROR] While starting the server, check your credentials and try again. Aborting.\n${error}`);
    process.exit(1);
  };
};

startServer();

