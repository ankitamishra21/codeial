const User = require('../models/user')
// this page shows what function to run when user routes to the page localhost:8000/users/profile
module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');
    return res.render('user_profile',{
        title: 'user profile'
    });
}
//this action is telling that do this action and render the view from the ejs file and connect this through routes
//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}
//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}
//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body,function(er,user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}
//sign in and create a session for user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();//passport function to logout

    return res.redirect('/');
}