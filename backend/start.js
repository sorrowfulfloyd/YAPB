const connectToDB = require('./db_connection/connect')
const app = require('./app/app')

require('dotenv').config({ path: '.env' });
const MONGO_URI = process.env.DB_ADRESS;
const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectToDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Bi' dakika şef, ateşliyorum... 🔥🔥🔥\nTamamdır, içerdeyiz. Port: ${PORT}`)

    });

  } catch (error) {
    console.log(`[ERROR] While starting the server, check your credentials and try again. Aborting.\n${error}`);
    process.exit(1);
  };
};

startServer();

