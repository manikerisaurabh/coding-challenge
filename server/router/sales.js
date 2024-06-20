import express from "express";
import { getInfoForBarChart, getNotSoldCount, getSalesByMonth, getSalesCount } from "../controller/sales.controller.js";
const router = express.Router();

router.get("/:month/sale/amount", getSalesByMonth)
router.get("/:month/sale/count", getSalesCount)
router.get("/:month/notSale/count", getNotSoldCount)

router.get("/:month/barChart", getInfoForBarChart)

export default router;