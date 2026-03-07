import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eace';

  if (mongoUri.includes('<db_password>')) {
    throw new Error('MONGO_URI still contains <db_password>. Replace it with your real MongoDB Atlas password.');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
