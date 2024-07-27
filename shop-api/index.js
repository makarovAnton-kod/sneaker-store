const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const products = require('./routers/products');
const categories = require('./routers/categories');
const users = require('./routers/users');
const orders = require('./routers/orders');
const seedData = require('./fixtures');
require('dotenv').config();

const config = require('./config');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/categories', categories);
app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);

// Ваша инициализация данных
const init = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);
    console.log('MongoDB connected');
    await seedData();
};

init().catch(console.error);

// Экспортируйте обработчик для Vercel
module.exports = (req, res) => {
    app(req, res);
};
