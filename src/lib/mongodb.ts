import mongoose from 'mongoose';

// Load environment variables if not already loaded
if (!process.env.MONGODB_URI) {
  require('dotenv').config({ path: '.env.local' });
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/handcrafted-haven';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  } | undefined;
}

let cached: { conn: any; promise: any } = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
