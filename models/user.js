const mongoose = require('mongoose');

//Defining a user schema for employees of team carrer camp
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

//created a model for schema and exported it
const User = mongoose.model('User',userSchema);

module.exports = User;