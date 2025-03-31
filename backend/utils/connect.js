import mongoose from 'mongoose';
import 'dotenv/config.js';

export default async function connect ()  {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connect();