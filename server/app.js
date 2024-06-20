import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import Product from './models/producat.js';
import connectToMongoDB from './database/connectToDB.js';

const app = express();

import productRoute from './router/product.js';
import salesRoute from './router/sales.js';

app.use(express.json());
app.use(cookieParser());


app.use("/api/products", productRoute);

app.use("/api/sales", salesRoute)



app.listen(8080, () => {
    console.log("App started listening on port 8080");
});
