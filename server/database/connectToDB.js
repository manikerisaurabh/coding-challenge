import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const url = "mongodb://127.0.0.1:27017/coding-challenge"
        await mongoose.connect(url);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Errow while connecting to MONGODB : " + error.message);
    }
};

export default connectToMongoDB;