const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        unique : true //every email id should be diff 
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{//timestamps give time info about created and updated time
    timestamps: true
});

//declaring that this is a mongoose model of userSchema named 'User
const User = mongoose.model('User',userSchema);

module.exports = User;