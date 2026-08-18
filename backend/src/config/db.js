const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    const useEmbedded = process.env.USE_EMBEDDED_MONGO === 'true';

    if (useEmbedded || !uri) {
      const port = Number(process.env.MONGO_PORT) || 27017;

      memoryServer = await MongoMemoryServer.create({
        instance: { port },
      });

      uri = memoryServer.getUri('personality_development');
      console.log('Using embedded MongoDB (no Atlas / Windows service needed)');
      console.log(`MongoDB running at mongodb://127.0.0.1:${port}`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = connectDB;
module.exports.disconnectDB = disconnectDB;
