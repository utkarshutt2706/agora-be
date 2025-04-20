import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let isConnected = false;

export const createMongoConnection = async () => {
  const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}`;
  try {
    isConnected = false;
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = true;
    console.log('connected to mongo on URI: ', mongoUri);
  } catch (error) {
    isConnected = false;
    console.log('error in connecting to mongo with URI: ', mongoUri);
    console.log(error);
  }
};

export const isMongoDbConnected = () => {
  return isConnected;
};
