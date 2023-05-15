//Require all the necessary dependencies
const express = require('express');
const router = express.Router();
const interviewsController = require('../controllers/interviews-controller');
const { checkAuthentication } = require('../config/customMiddleware');

//Mapped the route with the controller action 
router.get('/list-interviews',checkAuthentication,interviewsController.listInterviews);
router.get('/add-schedule-interview',checkAuthentication,interviewsController.addAndScheduleInterview);
router.get('/:id',checkAuthentication,interviewsController.resultInterview);
router.post('/create-interview',checkAuthentication,interviewsController.createInterview);
router.post('/schedule-interview',checkAuthentication,interviewsController.scheduleInterview);


module.exports = router;