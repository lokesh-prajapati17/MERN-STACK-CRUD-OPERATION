const express = require("express");
const app = express();
const MongoDB = require("./db");
const routes = require('./Routes/CRUD/Route');
const cors = require('cors'); // Import the CORS middleware

// Initialize MongoDB connection
MongoDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Use routes
app.use('/api', routes);

// Start the server
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
