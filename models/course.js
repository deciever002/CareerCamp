const mongoose = require('mongoose');

//Defining a course schema for storing scores of students of different subject
const courseScoreSchema = new mongoose.Schema({
    dsaScore: {
        type: Number,
        required: true,
    },
    reactScore:{
        type: Number,
        required: true
    },
    webDScore: {
        type: Number,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
},{
    timestamps: true
});

//create a model to export
const CourseScore = mongoose.model('CourseScore',courseScoreSchema);

module.exports = CourseScore;