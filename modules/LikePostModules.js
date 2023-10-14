const { string } = require('joi');
const mongoose = require('mongoose');

const LikePostschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true,'userId is require' ]
    },
    isLike: {
        type: Boolean,
        require: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        require : true
    },
    

})

const LikePost = mongoose.model('LikePost', LikePostschema);
module.exports = LikePost;