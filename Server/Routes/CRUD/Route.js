const express = require("express");
const router = express.Router(); // Create a new router object
const { getData, createData, deleteData, editData, getDataById } = require("./controllers"); // Import the controller functions

// Route to get data
// Handles GET requests to '/api/get'
// Calls the getData controller function to retrieve data from the database
router.get("/get", getData);

router.get("/get/:id", getDataById);

// Route to create new data
// Handles POST requests to '/api/create'
// Calls the createData controller function to add new data to the database
router.post("/create", createData);

// Route to delete data
// Handles DELETE requests to '/api/delete/:id'
// Calls the deleteData controller function to remove data by ID from the database
router.delete("/delete/:id", deleteData);

// Route to update existing data
// Handles PUT requests to '/api/update/:id'
// Calls the editData controller function to modify data by ID in the database
router.put("/update/:id", editData);

// Export the router to be used in the main application
module.exports = router;
