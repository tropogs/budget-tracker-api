import mongoose from 'mongoose';

export const removeAllCollections = async () => {
  Promise.all(
    Object.keys(mongoose.connection.collections).map(async collectionName => {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }),
  );
};

const setupDB = (dbName = 'testDB') => {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${dbName}`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await mongoose.connection.close();
  });
};

export default setupDB;
