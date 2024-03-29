const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');
//action to create a comment
// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         console.log("post",post,req.body)
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 if(err){console.log(err);}
//                 console.log(comment);
//                 post.comments.push(comment);//the comment in the argument is pushed--it will automatically fetch the id and push it.
//                 post.save();//before saving it is saved in the ram .save tells the db to save it permanently

//                 res.redirect('/')
//             })
//         }
//     })
// }//after this create a route in comment.js for the action

// //action to delete a comment
// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id){
//             //then find the post in which the comment is presenr
//             let postId =  comment.post;
//             //remove the comment
//             comment.remove();
//             //update the post after removing comment
//             //the $pull function is pulling the comment which is agian fetch the id of the comment
//             Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}},function(err,post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back')
//         }
//     });
//}  //after this create a route in comment.js for the action

// writing the above functions using async await
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })


            if (req.xhr){
                // Similar for comments to fetch the user's id!
                // comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            
            //destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return;
    }
    
}
