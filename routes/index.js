const express = require('express');

const routes = express.Router();

routes.use('/api',require('./v1/userApi'));

routes.use('/signup',require('./v1/signupApi'));

routes.use('/post',require('./v1/postText'));

routes.use('/LikePost',require('./v1/LikePost'));

module.exports = routes;
