const mongoose = require("mongoose"); // Import the Mongoose library

// Define a new schema for the CRUD operations
// The schema defines the structure of the documents that will be stored in the MongoDB collection
const Schema = mongoose.Schema({
  name: {
    type: String, // The name field is of type String
    required: true, // The name field is required
  },
  email: {
    type: String, // The email field is of type String
    required: true, // The email field is required
  },
  phone: {
    type: String, // The phone field is of type String
    required: true, // The phone field is required
  },
  age: {
    type: String, // The age field is of type String
    required: true, // The age field is required
  },
});

// Compile the schema into a model
// The model represents a collection in the database and provides an interface to interact with the documents
const crudSchema = mongoose.model('crud', Schema);

// Export the model to be used in other parts of the application
module.exports = crudSchema;
