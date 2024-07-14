import express from 'express';
import productsRouter from "./routers/products";
import cors from 'cors';
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use(express.json());
app.use(cors());
const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);