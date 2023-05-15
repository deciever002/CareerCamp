//Only authorized users can access specific pages in the app
module.exports.checkAuthentication = function checkAuthentication(req,res,next){
    //check if authorized
    if(req.isAuthenticated()){
        next();
    }else{
        //if not redirect to sign in page
        return res.redirect('/user/signin')
    }
}