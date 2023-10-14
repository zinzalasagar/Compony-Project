const express = require('express');

const app = express();

const port = 3000;

const path = require('path');

const bodyparser = require('body-parser')

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// app.set('view engine','ejs');

// app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes/index'));

const db = require('./config/mongoose');
const { route } = require('./routes/index');

app.use('/uploads',express.static(__dirname+'/uploads'));

app.listen(port,function(err){
    if(err){
        console.log("sever is not running on port");
        return false
    }
    console.log(`Sever is running on port http://localhost:3000`);
})
