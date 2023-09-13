const { application } = require("express")

// the controllers are the function written inside application.get /post etc
// pass this controller functions to routes which then connects to main index.js
//module.exports.actionName = function(req,res){}
const Post = require('../models/post')//require the post schema
const User =  require('../models/user')

// module.exports.home = function(req,res){
    // return res.end('<h1>from controller: express is up and running</h1>')
    // console.log(req.cookies);
    // res.cookie("user_id",01);//to change the cookie value in response->res.cookie(cookie name,value)


    // Post.find({},function(err,posts){//this find query will search all the posts
    //     return res.render('home',{
    //         title: "Codeial |Home", 
    //         posts: posts  //after defining the controller action fo to home.ejs
    //     });
//(-> whenever this action is called it will find all the posts put them into the context 'posts: posts' and send it to the view home.ejs)

// populating the user of each post--populating means fetching all the data of th euser in an object 
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate:{
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts){
//         // if(err){console.log(err);}
//         // console.log(posts);

//         User.find({},function(err,users){//user.find will find all the users
//             return res.render('home',{
//                 title: "Codeial |Home", 
//                 posts: posts,  //after defining the controller action fo to home.ejs
//                 all_users: users //after this make changes in home.ejs to display all the users
//             });
//         })
        
//     // return res.render('home',{
//     //     title: "Home",
//     });
// }

//module.exports.actionname = function(req,res)

// using async await function
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')//this will sort the post with the recent one above and the 1st one below(prepending)
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
    }).populate('likes');

        let users = await User.find({});

        return res.render('home',{
            title: "Codeial |Home", 
            posts: posts,  //after defining the controller action fo to home.ejs
            all_users: users //after this make changes in home.ejs to display all the users
        });
    }catch(err){
        console.log('Error'.err)
    }
}