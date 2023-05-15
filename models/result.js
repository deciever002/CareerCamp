const mongoose = require('mongoose');

//Defining a result schema student to map the result of student with the interview
const resultSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['PASS','FAIL','ON_HOLD',"DIDN'T ATTEMPT"],
        default: "DIDN'T ATTEMPT"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }
},{
    timestamps: true
});

//created and exported mongoose model created with schema
const Result = mongoose.model('Result',resultSchema);

module.exports = Result;