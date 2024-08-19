const mongoose = require("mongoose"); // Import the Mongoose library to handle MongoDB interactions

// Define the MongoDB connection URL
const MONGO_URL = "mongodb://localhost:27017/crud";

// Async function to connect to MongoDB
const MongoDb = async () => {
  try {
    // Attempt to connect to MongoDB using Mongoose
    // The 'then' method handles the successful connection
    await mongoose.connect(MONGO_URL).then(() => {
      console.log('Connected successfully to MongoDB'); // Log success message upon successful connection
    }).catch((err) => {
      console.log(err, "Error connecting to MongoDB"); // Log error message if the connection fails
    });
  } catch (error) {
    // Catch any unexpected errors and log them
    console.log("ERROR TO CONNECT WITH MONGODB", error);
  }
};

// Export the MongoDb function to be used in other parts of the application
module.exports = MongoDb;
