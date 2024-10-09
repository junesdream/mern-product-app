import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async () => {
	try {
		// Attempt to connect to the MongoDB database using the connection string from environment variables
		const conn = await mongoose.connect(process.env.MONGO_URI);

		// If the connection is successful, log the host of the connected database
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		// If there is an error during the connection, log the error message
		console.log(`Error: ${error.message}`);

		// Exit the process with a failure code (1)
		process.exit(1);
	}
};
