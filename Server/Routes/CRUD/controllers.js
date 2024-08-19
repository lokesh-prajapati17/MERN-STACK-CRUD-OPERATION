const crudSchema = require("./schemaModel"); // Import the Mongoose model for CRUD operations

// Function to get all data from the database
exports.getData = async (req, res) => {
  try {
    // Retrieve all documents from the collection
    const data = await crudSchema.find({});

    // Send the retrieved data back to the client with a 200 status code
    return res.status(200).json(data);
  } catch (error) {
    // Log the error and send a 500 status code if there is an error
    console.log("ERROR TO GET DATA", error);
    return res.status(500).json(error);
  }
};

exports.getDataById = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await crudSchema.findById({ _id });
    return res.status(200).json(data);
  } catch (error) {
    // Log the error and send a 500 status code if there is an error
    console.log("ERROR TO GET DATA BY ID", error);
    return res.status(500).json(error);
  }
};

// Function to create a new data entry in the database
exports.createData = async (req, res) => {
  try {
    console.log(req.body); // Log the request body for debugging purposes

    // Destructure the fields from the request body
    const { name, phone, age, email } = req.body;

    // Create a new document using the Mongoose model
    const newData = await crudSchema({
      name,
      phone,
      age,
      email,
    });

    // Save the new document to the database
    await newData.save();

    // Send the newly created document back to the client with a 200 status code
    return res.status(200).json(newData);
  } catch (error) {
    // Log the error and send a 500 status code if there is an error
    console.log("ERROR TO CREATE DATA", error);
    return res.status(500).json(error);
  }
};

// Function to delete a data entry from the database by ID
exports.deleteData = async (req, res) => {
  try {
    const _id = req.params.id; // Get the ID from the request parameters

    // Find the document by ID and delete it from the collection
    const data = await crudSchema.findByIdAndDelete({ _id });

    // Send the deleted document back to the client with a 200 status code
    return res.status(200).json(data);
  } catch (error) {
    // Log the error and send a 500 status code if there is an error
    console.log("ERROR TO DELETE DATA", error);
    return res.status(500).json(error);
  }
};

// Function to edit a data entry in the database by ID
exports.editData = async (req, res) => {
  try {
    const _id = req.params.id; // Get the ID from the request parameters
    const bodyData = req.body; // Get the updated data from the request body

    // Find the document by ID and update it with the new data
    // The 'new: true' option returns the updated document
    const data = await crudSchema.findByIdAndUpdate({ _id }, bodyData, {
      new: true,
    });

    // Send the updated document back to the client with a 200 status code
    return res.status(200).json(data);
  } catch (error) {
    // Log the error and send a 500 status code if there is an error
    console.log("ERROR TO EDIT DATA", error);
    return res.status(500).json(error);
  }
};
