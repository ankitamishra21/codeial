const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true//required true tells us that data will be saved
    },
    //linking the post to the user
    user:{
        //the type is a reference which refers to the user schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refer to which schema
    },
    //include the array of ids of all comments in this post schema itself
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' //refer to which schema
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true //created at and updated at times
});

const Post= mongoose.model('Post',postSchema);
module.exports = Post;
//next step is to go to views and create a form from where this colelction wil have a document in it that is an entry is created in the database