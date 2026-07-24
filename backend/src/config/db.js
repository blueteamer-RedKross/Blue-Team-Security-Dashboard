import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not set. Running with in-memory data store.');
    return null;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return null;
  }
};
