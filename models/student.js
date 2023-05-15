//Require mongoose database
const mongoose = require('mongoose');

//Created student schema 
const studentSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['placed','not_placed'],
        default: 'not_placed'
    },
    batch: {
        type: String,
        required: true
    },
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ],
    courseScores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseScore',
        required: true
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }]
},{
    timestamps: true
});

//Created a mongoose model for student schema
const Student = mongoose.model('Student',studentSchema);

//exports module Student
module.exports = Student;