import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import exitHook from 'async-exit-hook';
import products from './routers/products.js';
import categories from './routers/categories.js';
import users from './routers/users.js';
import orders from './routers/orders.js';
import path, { join } from 'path';
import dotenv from 'dotenv';
import config from "./config.js";

dotenv.config();

const app = express();
const port = 8000;
app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.use('/categories', categories);
app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);


// Обработка корневого маршрута
app.get('/', (req, res) => {
    res.send('Добро пожаловать в магазин!');
});

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');

        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}!`);
        });
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
        process.exit(1); // Завершить процесс с кодом ошибки
    }
};

run().then();

exitHook(async () => {
    await mongoose.disconnect();
    console.log('MongoDB отключен');
});

export default app;
