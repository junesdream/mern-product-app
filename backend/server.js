import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();



app.use(express.json()); // middleware

app.post("/api/products", async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.description || !product.countInStock || !product.image) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create Product:", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

app.listen(5001, () => {
	connectDB();
	console.log("Server started at http://localhost:5001");
});
