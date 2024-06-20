import Product from "../models/producat.js";
import connectToMongoDB from "../database/connectToDB.js";
import { searchByMonthUtil } from "../utils/searchByMonthUtil.js";
import express from "express";
export const getAllProducts = async (req, res) => {
    try {
        await connectToMongoDB();

        console.log("req to get")
        const allProducts = await Product.find({});
        console.log(allProducts)
        if (allProducts) {
            return res.json({
                success: "ok",
                data: allProducts
            })
        }
    } catch (error) {
        console.log("Error in getAllProducts controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const searchByTitle = async (req, res) => {
    try {
        await connectToMongoDB();
        const { searchTitle } = req.params;
        console.log("this is tite : " + searchTitle)
        const searchProduct = await Product.find({ title: searchTitle });

        if (!searchProduct) {
            return res.json({
                success: false,
                message: "product not found"
            })
        }

        return res.json({
            success: true,
            data: searchProduct
        });

    } catch (error) {
        console.log("Error in searchByTitle controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const searchById = async (req, res) => {
    try {
        await connectToMongoDB();
        const { searchID } = req.params;
        console.log("this is tite : " + searchID)
        const searchProduct = await Product.find({ id: searchID });

        if (!searchProduct) {
            return res.json({
                success: false,
                message: "product not found"
            })
        }

        return res.json({
            success: true,
            data: searchProduct
        });
    } catch (error) {
        console.log("Error in searchById controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export const searchByMonth = async (req, res) => {
    try {
        const { searchMonth } = req.params;
        const allProducts = await searchByMonthUtil(searchMonth);
        if (allProducts.length == 0) {
            return res.json({
                success: true,
                message: "product not found",
                data: allProducts,
            })
        }


        return res.json({
            success: true,
            data: allProducts
        })
    } catch (error) {
        console.log("Error in searchByMonth controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}