import express from 'express';
import * as adminController from './../controllers/admin-controller.js';

const Router = express.Router();
Router.route('/login').post(adminController.login);
Router.route('/employee').post(adminController.post);

export default Router;