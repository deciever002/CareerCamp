//Require Mongoose Dependency
const mongoose = require('mongoose');

// Connect to MongoDB for retrieval of documents
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    //Connected to mongoose database.
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    //Error connecting to mongoose database.
    console.error('Error connecting to MongoDB:', error);
  });