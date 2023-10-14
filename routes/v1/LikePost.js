const express = require('express');

const routes = express.Router();

 const {varifytoken} = require('../../utils/commenFunction');

const LikePostController  = require('../../controller/v1/LikePostController');

routes.post('/PostLike',varifytoken,LikePostController.PostLike);

routes.get('/getLikePost',varifytoken,LikePostController.getLikePost);

module.exports = routes;