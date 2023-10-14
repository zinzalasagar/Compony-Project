const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');
const LikePost = require('./LikePostModules');

const AVATAR_PATH = path.join('/uploads/users/avatar');

const PostTextschema = new mongoose.Schema({

    postText: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    avatar : {
        type : String,
        require : true
    },
});

var storage = multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

PostTextschema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
PostTextschema.statics.avatarPath = AVATAR_PATH;

const postText = mongoose.model('postText', PostTextschema);

module.exports = postText;
