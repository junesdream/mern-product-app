import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Get all products
export const getProduct = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error in Fetch Products:", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// Create a new product
export const createProduct = async (req, res) => {

	const product = req.body;

	if (
		!product.name ||
		!product.price ||
		!product.description ||
		!product.countInStock ||
		!product.image
	) {
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
};

// Update an existing product
export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	console.log("Received body:", product);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid product id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// Delete a product
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid product id" });
	}
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product removed" });
	} catch (error) {
		console.error("Error in Fetch Products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
 