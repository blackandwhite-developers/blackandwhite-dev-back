import { MongooseLodge } from '@/api/lodge/model/lodge.schema';
import mongoose from 'mongoose';

// mongodb+srv://[]:BUFfDus9RCF9S3ff@mongo-study.jdr95.mongodb.net/

const mongodbUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;

export const db = mongoose.createConnection(mongodbUri).asPromise();

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`,
      {
        dbName: 'blackAndWhite',
      },
    );
    await MongooseLodge.collection.dropIndexes();
    await MongooseLodge.syncIndexes();
    console.log('Connected to MongoDB ^-^');
  } catch (error) {
    console.error(error);
  }
})();
