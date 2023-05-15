//Required Dependencies
const CourseScore = require("../models/course");
const Interview = require("../models/interview");
const Result = require("../models/result");
const Student = require("../models/student");

//Redirect user to add student page if route matches the action
module.exports.addStudentPage = function(req,res){
    return res.render('add-student',{
        title: "Add Student"
    })
}

//Action to create the student
module.exports.createStudent = async function(req,res){
    try{
        //grab all the necessary inputs
        const {name,college,batch,reactScore,webDScore,dsaScore} = req.body;
        let id = 1;
        let student = await Student.find({});
        if(student){
            id = student.length + 1;
        }
        //Calculate Id everytime
        id = batch + (id < 10 ? ("0" + id) : id);
        let interviewsPresent = false;
        let interviewIds = [];
        //find if there are any interviews
        const interviews = await Interview.find({});

        //if there are any interviews then add it in interviews array present inside student model
        if(interviews.length > 0){
            interviewIds = interviews.map((interview) => interview._id);
            interviewsPresent = true;
        }
        //seprate model to add/access scores of the student
        const newCourse = await CourseScore.create({
            dsaScore,
            reactScore,
            webDScore
        });
        //create a new student
        const newStudent = await Student.create({
            id,
            name,
            college,
            batch,
            courseScores: newCourse._id
        });

        //if there are any interviews then add it in interviews array present inside student model
        if(interviewsPresent){
            let resultIds = [];
            //loop through interview ids and create the result for the new student with interview ids present
            for(let interviewId of interviewIds){
                const result = await Result.create({student: newStudent._id,interview:interviewId});
                await Interview.findByIdAndUpdate(interviewId,{$push: {students: newStudent._id,results: result._id}});
                resultIds.push(result._id);
            }
            //finally add array of the result ids in sstudent
            await Student.findByIdAndUpdate(newStudent._id,{ results: resultIds, interviews: interviewIds});
        }else{
            //if there are no interviews simply create a result and attach it to student results array
            const result = await Result.create({student: newStudent._id});
            await Student.findByIdAndUpdate(newStudent._id, {$push: { results: result._id}});
        }
        req.flash('success','Student Added!');
        return res.redirect('/student/list-students');
    } catch(err){
        req.flash('error',err._message);
        return res.redirect('back');
    }
}

//action to show the list of students
module.exports.listStudents = async function(req,res){
    let students = await Student.find({})
    .populate('courseScores');

    //render the list of students view
    return res.render('list-students',{
        title: "List Students",
        students
    })
}

//If the student is selected in the interview then mark the result as pass and student status as placed
module.exports.selectStudent = async function(req,res){
    const student = req.params.sid;
    const interview = req.params.iid;
    await Student.findByIdAndUpdate(student,{status: 'placed'});
    await Result.findOneAndUpdate({student,interview},{status: 'PASS'});
    return res.redirect('back');
}

//If the student is rejected in the interview then mark the result as Fail
module.exports.rejectStudent = async function(req,res){
    const student = req.params.sid;
    const interview = req.params.iid;
    await Result.findOneAndUpdate({student,interview},{status: 'FAIL'});
    return res.redirect('back');
}

