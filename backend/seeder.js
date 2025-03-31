import User from './models/User.js';
import Event from './models/Event.js';
import './utils/connect.js';
import mongoose from 'mongoose';

async function seedDatabase() {
    try {
        await User.deleteMany(); // Clear existing users
        console.log('Existing users deleted.');
        await Event.deleteMany(); // Clear existing events
        console.log('Existing events deleted.');
    }catch (error) {
        console.error('Error seeding database:', error);
    }
}
seedDatabase();