import adminRouter from './admin-routes.js';
import employeeRouter from './employee-routes.js'


export default (app) => {
    app.use('/admin', adminRouter);
    app.use('/employee', employeeRouter);
}