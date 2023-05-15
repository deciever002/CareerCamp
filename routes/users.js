//Require all the dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users-controller');
const { checkAuthentication } = require('../config/customMiddleware');


//User specific routes all the incoming traffic to /users will be directed here
router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);
router.post('/create-session',passport.authenticate('local',{ failureRedirect: '/user/signin'}),usersController.createSession);
router.post('/create',usersController.create);
router.get('/profile',checkAuthentication,usersController.profile);
router.get('/destroy-session',usersController.destroySession);


module.exports = router;