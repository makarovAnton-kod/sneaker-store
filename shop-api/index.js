const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const products = require('./routers/products');
const categories = require('./routers/categories');
const users = require('./routers/users');
const orders = require('./routers/orders');
const seedData = require('./fixtures');
const {join} = require("node:path"); // Импорт функции по умолчанию
require('dotenv').config();

const app = express();
const port = 8000;

app.use('/images', express.static(join(__dirname, 'public/images')));
app.use(express.json());
app.use(cors());
app.use('/categories', categories);
app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');

        await seedData();
        console.log('Data seeded successfully');

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

module.exports = app;
