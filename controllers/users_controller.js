// this page shows what function to run when user routes to the page localhost:8000/users/profile
module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');
    return res.render('user_profile',{
        title: 'user profile'
    });
}