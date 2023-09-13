const Post = require('../models/post') 
const Comment =  require('../models/comment')
const Like = require('../models/like');
// module.exports.create = function(req,res){
//     //using the post schema create
//     Post.create({
//         content: req.body.content,//the content from the attr from home.ejs is fetched
//         user: req.user._id
//     },function(err,post){
//         if(err){console.log('error in creating a post'); return}
//         return res.redirect('back');
//     });

// }
// //now create a route for this post

// //creating an action to delete post and its comments
// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id, function(err,post){
//         //.id means converting the object id into string in mongoose (previously we used _id)
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id},function(err){ //deleteMany deletes all the post related of the id fetched by req.params.id
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }
//after this create a route in post.js

//writing the above code usinf async await
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
//after creating the ajax function need to check if it is xmlhttprequest
        if(req.xhr){
            return res.status(200).json({ //json return through codes 200= success
                data: {
                    post: post//if xhr request then return the post from await function to this key
                },
                message: 'Post created!'//general format while sending a data through json isincluding a message
            });
        }

        req.flash('success','Post published');
        return res.redirect('back');

    }catch(err){
        // console.log('Error', err);
        // return;
        req.flash('error',err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post!')
            return res.redirect('back');
        }

    }catch(err){
        // console.log('Error', err);
        // return;
        req.flash('error',err);
        return res.redirect('back');
    }
    
}