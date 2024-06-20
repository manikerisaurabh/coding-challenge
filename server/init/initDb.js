import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import Product from '../models/producat.js';  // Adjust the import path as necessary
import connectToMongoDB from '../database/connectToDB.js';  // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
        // Initialize data after successful connection
        initData();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Function to initialize data
const initData = async () => {
    try {
        const dataURL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
        const response = await axios.get(dataURL);
        const data = response.data;

        // Insert data into the database
        await Product.insertMany(data);
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error fetching or inserting data:', error);
    }
};

// Start the server
app.listen(8080, () => {
    console.log("App started listening on port 8080");
});
