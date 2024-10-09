import express from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Route to get all products
router.get("/", getProduct);

// Route to create a new product
router.post("/", createProduct);

// Route to update an existing product by ID
router.put("/:id", updateProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
