import mongoose from 'mongoose';

export const generateArray = (numElements: number, generator: () => any) => {
  const arr = new Array(numElements).fill(null).map(() => ({
    _id: mongoose.Types.ObjectId(),
    ...generator(),
  }));
  return arr;
};

export const removeAllCollections = async () => {
  Promise.all(
    Object.keys(mongoose.connection.collections).map(async collectionName => {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }),
  );
};

export const setupDB = (dbName = 'testDB') => {
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
