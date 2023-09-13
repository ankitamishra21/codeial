const User = require('../models/user')
const Post = require('../models/post')
const path = require('path')
const fs = require('fs')
// this page shows what function to run when user routes to the page localhost:8000/users/profile
module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'user profile',
            profile_user: user
        });
    });
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                //this is fetching the body part of the ejs through the help of multer 
                user.name = req.body.name;
                user.email = req.body.email;
                console.log(req.file)
                if(req.file){
                    console.log(req.file.filename)
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of the uploaded file into the avatar filed in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error',err);       
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        // if(err){console.log('error in finding user in signing up'); return}
        if(err){req.flash('error', err); return}

        if(!user){
            User.create(req.body,function(er,user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}
//sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');//to take out the flash msgs from req and to put it in response we created middleware
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','You have logged out!');//we create a middleware(config/middleware.js)

        res.redirect('/');
      });

    // req.logout();//passport function to logout

    // return res.redirect('/');
}