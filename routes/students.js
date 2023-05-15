//Require all the dependencies
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students-controller');
const { checkAuthentication } = require('../config/customMiddleware');

//Route the url with the controller action
router.get('/add-student',checkAuthentication,studentsController.addStudentPage);
router.post('/create-student',checkAuthentication,studentsController.createStudent);
router.get('/list-students',checkAuthentication,studentsController.listStudents);
router.get('/selected/:sid/:iid',checkAuthentication,studentsController.selectStudent);
router.get('/rejected/:sid/:iid',checkAuthentication,studentsController.rejectStudent);


module.exports = router;