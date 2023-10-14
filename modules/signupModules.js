const mongoose = require('mongoose');
const { stringify } = require('querystring');
const user = require('./userModules');

const signupschema = mongoose.Schema({
    
    username  :{
        type  : String,
        require : true,
    },
    email: {
        type: String,
        require: true
    },
    password : {
        type : String,
        require : true
    }
    // userId :{
    //     type : mongoose.Schema.Types.ObjectId,
    //     require : true
    // }
})

const signup = mongoose.model('signup', signupschema);
module.exports = signup;