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
const port = 8000;
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/categories', categories);
app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);
    await seedData();
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        exitHook(() => {
            mongoose.disconnect();
            console.log('MongoDb disconnect');
        });
    });
};
run().catch(console.error);

module.exports = (req, res) => {
    app(req, res);
};