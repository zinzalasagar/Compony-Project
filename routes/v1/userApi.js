const express = require('express');

const routes = express.Router();

const user = require('../../modules/userModules');

const tablecontroller = require('../../controller/v1/userController');

routes.post('/insertData',tablecontroller.insertData);

routes.get('/viewData',tablecontroller.viewData);

routes.delete('/deleteData/:id',tablecontroller.deleteData);

routes.put('/updateData/:id',tablecontroller.updateData);

module.exports = routes;
