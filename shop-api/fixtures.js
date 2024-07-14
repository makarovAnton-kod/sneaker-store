import mongoose from 'mongoose';
import config from './config.js';
import Product from './models/Product.js';
import User from './models/User.js';

const dropCollection = async (db, collectionName) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['categories', 'products', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    await Product.create(
        {
            title: 'Intel Core i7 12700K',
            price: 350,
            image: 'fixtures/cpu.jpg',
        },
        {
            title: 'Samsung 990 Pro 1TB',
            price: 170,
            image: 'fixtures/ssd.jpg',
        },
    );

    await User.create({
            email: 'user@shop.local',
            displayName: 'John Doe',
            password: '12345',
            token: crypto.randomUUID(),
        },
        {
            email: 'user2@shop.local',
            displayName: 'Jane Rome',
            password: '123',
            token: crypto.randomUUID(),
        });

    await db.close();
};

void run();
