import Product from "../models/producat.js"
import connectToMongoDB from "../database/connectToDB.js";

export const searchByMonthUtil = async (searchMonth) => {
    try {
        await connectToMongoDB();

        const allProducts = await Product.find({});
        let selectProduct = [];

        allProducts.forEach(product => {
            const date = new Date(product.dateOfSale);
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            if (month == searchMonth) {
                selectProduct.push(product)
            }
        });

        return selectProduct;
    } catch (error) {
        console.log("Error in searchByMonth util  : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}