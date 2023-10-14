const express = require('express');
const { route } = require('./userApi');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const { varifytoken } = require('../../utils/commenFunction');

const PosttextController = require('../../controller/v1/posttextController');
const Post = require('../../modules/postextModules');

routes.post('/postData',varifytoken,Post.uploadedAvatar, PosttextController.postData);

routes.get('/getData',varifytoken, PosttextController.getData);

routes.get('/GetAllPost',varifytoken,PosttextController.GetAllPost);

module.exports = routes;