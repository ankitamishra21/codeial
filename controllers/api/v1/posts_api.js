//creating a post api controller
//requiring the post model
const Post = require('../../../models/post')

const Comment = require('../../../models/comment')

//index is usually used when you want to list down something as an action name
module.exports.index = async function(req,res){
//fetching the posts
    let posts = await Post.find({})
        // .sort('-createdAt')//this will sort the post with the recent one above and the 1st one below(prepending)
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
    });
    
    
    return res.status(200).json({    
        message: "List of posts",
        posts : posts
    });
}
//after this creating a post api route in routes/api/v1/posts.js

//remove post function without authentication
module.exports.destroy = async function(req, res){

    try{
        
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            
            return res.status(200).json({
                message: "Post and associated comment deleted successfully"
            });
        }else{
            return res.status(401).json({
                message: ' You cannot delete this post',
            });
        }

    }catch(err){
        
        return res.status(500).json({
            message: err
        });
    }
    
}//now go to routes to make a route for deleting in api/vi/posts.js