const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/table');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',function(err){
    if(err){
        console.log("Databace not connected");
    }
    console.log("Database connected");
})

module.exports = db;

