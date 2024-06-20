import express from "express";
import { getAllProducts, searchById, searchByMonth, searchByTitle } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts)

router.get("/search/title/:searchTitle", searchByTitle)
router.get("/search/id/:searchID", searchById)
router.get("/search/month/:searchMonth", searchByMonth)
export default router;