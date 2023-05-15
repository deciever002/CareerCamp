const mongoose = require('mongoose');

//Defining a interview schema for employees of team carrer camp to add interview for a student
const interviewSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        required: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result'
        }
    ]
},{
    timestamps: true
});

//created and exported that mongoose model
const Interview = mongoose.model('Interview',interviewSchema);

module.exports = Interview;