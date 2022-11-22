//install passport->npm install passport
//install the strategy you want to use->npm install passport-local
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({//telling passport to use th elocal strategy
    usernameField : 'email'//email from the schema
    },
    function(email,password,done){//uses 3 arguments..done is a callback function which reports back to passport(can call it anything) 
        //find a user and establish the identity
        User.findOne({email: email},function(err,user){//first email category from above ..schema: 2nd email is the user input
            if(err){
                console.log('error in finding user --> passport');//if user not found showing error
                return done(err);
            }
            if(!user || user.password != password){//if user or password doesnt match showing error
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);//else returning the user..done takes 2 arguments if not err returns null i.e no err
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
//(when user sign in we find the id and send it to the cookie and the cookies send to the browser..now browser makes a request so we deserialize it and find the user again)
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user->passport deserializing');
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){//middleware created
    //if user is signed in then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user
    }
    next()
}

module.exports = passport;