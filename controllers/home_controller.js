const { application } = require("express")

// the controllers are the function written inside application.get /post etc
// pass this controller functions to routes which then connects to main index.js
//module.exports.actionName = function(req,res){}
module.exports.home = function(req,res){
    // return res.end('<h1>from controller: express is up and running</h1>')
    console.log(req.cookies);
    res.cookie("user_id",01);//to change the cookie value in response->res.cookie(cookie name,value)
    return res.render('home',{
        title: "Home",
    });
}

//module.exports.actionname = function(req,res)