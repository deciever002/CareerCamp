//Require all the dependencies
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home-controller');
const { checkAuthentication } = require('../config/customMiddleware');

router.get('/',homeController.home);

//Used the router middleware for routes other than home
router.use('/user',require('./users'));
router.get('/download-results',checkAuthentication,homeController.downloadResults);
router.use('/student',require('./students'));
router.use('/interview',require('./interviews'));
router.get('*',function(req,res){
    res.render('404',{
        title: "Page Not Found"
    })
});


module.exports = router;