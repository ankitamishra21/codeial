const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true//required true tells us that data will be saved
    },
    //comment belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refer to which schema
    },
    
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //refer to which schema
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timesatmps: true //created at and updated  times
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports =  Comment;