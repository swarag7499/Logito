import express from 'express';
import * as employeeController from './../controllers/employee-controller.js';
import * as auth from './../middleware/auth.js';

const Router = express.Router();
Router.route('/login').post(employeeController.login);
Router.route('/project').post(auth.verifyToken, employeeController.postProject);
Router.route('/project/:username').get(auth.verifyToken, employeeController.getProjects);
Router.route('/project/items/:username').get(auth.verifyToken, employeeController.getProjectsByPagination);
Router.route('/project/role/:role').get(auth.verifyToken, employeeController.getEmployeeByRole);
Router.route('/project/title/:title').get(auth.verifyToken, employeeController.getProjectByTitle);
Router.route('/project/status/:status').get(auth.verifyToken, employeeController.getProjectByStatus);
Router.route('/project/:id').get(auth.verifyToken, employeeController.getProjectById);
Router.route('/project/:id').put(auth.verifyToken, employeeController.putProject);
Router.route('/project/:id').delete(auth.verifyToken, employeeController.removeProject);
Router.route('/:id').get(auth.verifyToken, employeeController.getEmployeeById);
export default Router;