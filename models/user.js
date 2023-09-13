const mongoose = require('mongoose');

// npm install multer then require(multer is a middleware but we are not requiring it in config folder)
const multer = require('multer');
//we are setting multer individually for each model bcz we are uploading thar file specific to user
const path = require('path')//requiring path bcz we will be setting the path where the file will be stored
const AVATAR_PATH = path.join('/uploads/users/avatar');//this is where we are going to store all the files

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
    },
    avatar:{
        type: String//declaring this bcz this will store the path of the file in db as db doesnt store the file
    },
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]
},{//timestamps give time info about created and updated time
    timestamps: true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {//destination points to the path where the file is going to be stored 
        console.log(file)
        cb(null, path.join(__dirname,'..',AVATAR_PATH))//this will return the joined path of modelsthis file to the avatars
    },
    filename: function (req, file, cb) {//file name is the name of the file we are going to store
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)//this gives the time in milliseconds from jan 1 1970
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }//any file you store for every user in this filelname in this will be stored as avatar _ value of date.now
  });

//static methods--static func are func which can be called over the overall class
//schema.statics.the func name
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');//the storage (attaches the disk storage to this storage property) tells us that the diskstorage will be stored here and the single says that only 1 file or 1 instance will be uploaded for the fieldname avatar
userSchema.statics.avatarPath = AVATAR_PATH//want AVATAR_PATH to be available publically for the user model

//declaring that this is a mongoose model of userSchema named 'User
const User = mongoose.model('User',userSchema);

module.exports = User;