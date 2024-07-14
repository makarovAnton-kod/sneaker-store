import express from 'express';
import productsRouter from "./routers/products.js";
import cors from 'cors';
import usersRouter from "./routers/users.js";
import mongoose from "mongoose";
import config from "./config.js";

const app = express();
const port = 8000;

app.use('/products', productsRouter);
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