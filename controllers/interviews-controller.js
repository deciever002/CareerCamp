//Require Dependencies
const Interview = require("../models/interview");
const Student = require("../models/student");
const Result = require('../models/result');


//Create all actions for the necessary routes

//Created list interviews actioin for showing the list of interviews
module.exports.listInterviews = async function(req,res){
    const interviews = await Interview.find({});
    //render the list of interviews page
    return res.render('list-interviews',{
        title: 'List Interviews',
        all_interviews: interviews
    });
}

//Created an action to mark the status of interviews of student as selected or rejected
module.exports.resultInterview = async function(req,res){
    //Find the interview and populate necessary fields
    const interview = await Interview.findById(req.params.id)
    .populate({
        path: 'results',
        populate: {
            path: 'student'
        }
    })

    //Render the result interivew page
    return res.render('interview-result',{
        title: 'List Interviews',
        interview
    });
}


//Create interview action to create the interviews for students
module.exports.createInterview = async function(req,res){
    try {
        //find all the students
        const students = await Student.find({});
        const {companyName,date} = req.body;
        let existingInterviews = await Interview.find({});
        //Create the interview
        const interview = await Interview.create({
            companyName,
            date
        });
        //If there are existing interviews then for each student create a result 
        //and push id of result it to results array in student and interview
        //As result is created when adding a new student
        //If an interview is added then we need to map the student id and interview id with result
        //So that we can keep track of all the result with every new interview that is added
        if(existingInterviews.length > 0){
            students.forEach(async (student)=>{
                const result = await Result.create({student: student._id,interview: interview._id});
                await Student.findByIdAndUpdate(student._id, {$push: { results: result._id,interviews: interview._id}});
                await Interview.findByIdAndUpdate(interview._id,{$push: { results: result._id, students: student._id }});
            })
        }
        //Don't create a result document only find and update it
        else{
            students.forEach(async (student)=>{
                const result = await Result.findOneAndUpdate({student: student._id},{interview: interview._id},{new: true});
                await Student.findByIdAndUpdate(student._id, {$push: { interviews: interview._id}});
                await Interview.findByIdAndUpdate(interview._id,{$push: { results: result._id, students: student._id }});
            })
        }

        //If everything is successful then prompt the user interview added
        req.flash('success','Interview Added, Schedule it for a Student Now!');
        res.redirect('back');
    } catch (error) {
        //Incase something went wrong
        console.log(error);
        req.flash('error',error._message);
        return res.redirect('back');
    }
}

//This action is used to map the result with student id and interview id
module.exports.scheduleInterview = async function(req,res){
    try {
        //grab student id and interview id
        const {studentId,interviewId} = req.body;
        await Student.findById(studentId);
        await Interview.findById(interviewId);
        const studentResultInterviewStatus = await Result.findOne({student: studentId,interview: interviewId});
        //check if the interview is already scheduled for the student
        if(studentResultInterviewStatus.status != "DIDN'T ATTEMPT"){
            req.flash('error','Interview already scheduled for student!');
            return res.redirect('back');
        }
        //if the interview is not scheduled then mark the status of result as on hold and update the result
        await Result.findOneAndUpdate({student: studentId,interview: interviewId},{ status: 'ON_HOLD'});

        //if everything is successful prompt the user with success message
        req.flash('success','Interview scheduled for student');
        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
        req.flash('error',error._message);
        return res.redirect('back');
    }
}

//action to render add/schedule page on screen
module.exports.addAndScheduleInterview = async function(req,res){

    try {
        let students = await Student.find({})
        .sort('-createdAt');

        let interviews = await Interview.find({})
        .sort('-createdAt');
        //render the view
        return res.render('add-schedule-interview',{
            title: 'Schedule Interview',
            students,
            interviews
        });
    } catch (error) {
        console.log('Error', err);
        req.flash('error',error._message);
        return;
    }
}