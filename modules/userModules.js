const mongoose = require('mongoose');
const { stringify } = require('querystring');

const path = require('path');

const userschema = mongoose.Schema({

        name: {
            type: String,
            require: true,
            trim:true,
            lowercase : true,
            uppercase:true
            
        },
        email: {
            type: String,
            require: true,
            trim:true,
        },
        password: {
            type:String,  
            require: true,
        },
        avatar : {
            type : String,
            require : true
        }
})

const user = mongoose.model('users', userschema);
module.exports = user;