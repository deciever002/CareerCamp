const bcrypt = require('bcrypt');
const User = require('../models/user');

//action to redirect to sign in page (employee)
module.exports.signIn = function(req,res){
    //if the request is not authenticated i.e. user is not logged in return to home
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin',{
        title: "Sign In"
    });
}

//action to redirect to sign up page
module.exports.signUp = function(req,res){
    //if the request is not authenticated i.e. user is not logged in return to home
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    //Render the sign up page
    return res.render('signup',{
        title: "Sign Up"
    });
}

//Action to redirect to profile page
module.exports.profile = function(req,res){
    return res.render('profile',{
        title: 'Profile'
    });
}

//Action to log out the user if its session exists in the server using passport which provides logout function
module.exports.destroySession = function(req,res){
    //using passport logout function
    req.logout(function(err) {
        if (err) { 
            req.flash('error',err);
            return next(err); 
        }
        req.flash('success','Logged Out!');
        res.redirect('/');
    });
}

//Create session is the action called after passport intializes identity in session and redirects user to profile page
module.exports.createSession = function(req,res){
    req.flash('success','Logged In!');
    res.redirect('/user/profile');
}

//action to create the user and record its entry in data base
module.exports.create = async function(req,res){
    const {name,email,password,confirmPassword} = req.body;

    //check for edge cases 
    if(password != confirmPassword){
        req.flash('error', 'Password and confirm password do not match');
        return res.redirect('back');
    }

    //hash the password before storing it in db
    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const user = await User.findOne({email});

        //if the user already exist redirect it to sign in page
        if(user){
            req.flash('error', 'User Already Exists');
            return res.redirect('/user/signin');
        }

        //create the new user with the inputs
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        //Redirect User back to Login Page
        req.flash('success', 'User Registered');
        return res.redirect('/user/signin');

    }catch(err){
        //incase something went wrong
        console.log(err);
        return res.redirect('back');
    }
}