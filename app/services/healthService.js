import { isMongoDbConnected } from '../db/mongo.js';

export const getHealthStatus = () => {
  const isMongoDbConnectedFlag = isMongoDbConnected();

  return {
    json: {
      port: process.env.PORT || 3000,
      timestamp: new Date().toString(),
      isMongoDbConnected: isMongoDbConnectedFlag,
      status: isMongoDbConnected ? '200 OK ✅' : '500 NOT OK ❌',
      message: isMongoDbConnected
        ? 'Server is healthy 🚀'
        : 'DB connection was unsuccessful 💥',
    },
    status: isMongoDbConnectedFlag,
  };
};
