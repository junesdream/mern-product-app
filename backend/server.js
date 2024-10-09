import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; // Use the port from environment variables or default to 5001

app.use(express.json()); // Middleware to parse JSON bodies

// Use the product routes for any requests to /api/products
app.use("/api/products", productRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
	connectDB(); // Connect to MongoDB
	console.log("Server started at http://localhost:" + PORT); // Log the server start
});
