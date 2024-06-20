import connectToMongoDB from "../database/connectToDB.js";
import Product from "../models/producat.js";
import { searchByMonthUtil } from "../utils/searchByMonthUtil.js";


export const getSalesByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        console.log("got in sales " + month)

        const selectedData = await searchByMonthUtil(month);
        let sales = 0;
        selectedData.forEach(product => {
            sales += parseInt(product.price)
        });
        return res.json({
            success: true,
            data: sales
        })
    } catch (error) {
        console.log("Error in getSalesByMonth controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getSalesCount = async (req, res) => {
    try {
        const { month } = req.params;
        console.log("got in sales " + month)

        const selectedData = await searchByMonthUtil(month);
        let soldCount = 0;
        selectedData.forEach(product => {
            if (product.sold) {
                soldCount++
            }
        })
        return res.json({
            success: true,
            data: soldCount
        })
    } catch (error) {
        console.log("Error in getSalesByMonth controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getNotSoldCount = async (req, res) => {
    try {
        const { month } = req.params;
        const selectedData = await searchByMonthUtil(month);

        let unsoldCount = 0;

        selectedData.forEach(product => {
            if (!product.sold) {
                unsoldCount++
            }
        })
        return res.json({
            success: true,
            data: unsoldCount
        })
    } catch (error) {
        console.log("Error in getSalesByMonth controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getInfoForBarChart = async (req, res) => {
    try {
        const { month } = req.params;
        const selectedData = await searchByMonthUtil(month);
        const productRanges = {
            "0-100": 0,
            "101-200": 0,
            "201-300": 0,
            "301-400": 0,
            "401-500": 0,
            "501-600": 0,
            "601-700": 0,
            "701-800": 0,
            "801-900": 0,
            "900+": 0
        };

        selectedData.forEach(product => {
            const price = parseInt(product.price, 10);
            if (price > 0 && price <= 100) {
                productRanges["0-100"] += 1;
            } else if (price <= 200) {
                productRanges["101-200"] += 1;
            } else if (price <= 300) {
                productRanges["201-300"] += 1;
            } else if (price <= 400) {
                productRanges["301-400"] += 1;
            } else if (price <= 500) {
                productRanges["401-500"] += 1;
            } else if (price <= 600) {
                productRanges["501-600"] += 1;
            } else if (price <= 700) {
                productRanges["601-700"] += 1;
            } else if (price <= 800) {
                productRanges["701-800"] += 1;
            } else if (price <= 900) {
                productRanges["801-900"] += 1;
            } else {
                productRanges["900+"] += 1;
            }
        });

        res.json({
            success: true,
            data: productRanges
        });

    } catch (error) {
        console.log("Error in getInfoForBarChart controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}