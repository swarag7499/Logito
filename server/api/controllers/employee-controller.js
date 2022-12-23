import * as employeeServices from './../services/employee-services.js';
import {response} from "express";
import Employee from './../models/Employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import paginate from 'jw-paginate';

const setResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

const setError = (err, response) => {
    response.status(500);
    response.json(err);

}
//Employee login API
export const login = (async (req, res, next) => {
    try {

        const {emailID, password} = req.body;

        // Validate user input
        if (!(emailID && password)) {
            res.status(400).send("All input is required");
            // setError()
        }
        // Validate if admin exists
        const employee = await Employee.findOne({emailID});

        if (employee && (await bcrypt.compare(password, employee.password))) {
            // Create token3
            const token = jwt.sign(
                {employee_id: employee._id, emailID},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            employee.token = token;

            // user
            res.status(200).json(employee);
        } else {
            res.status(400).send("Incorrect Username or Password");
        }
    } catch (err) {
        console.log(err);
    }
});

//Create project API
export const postProject = (async (req, res) => {
    try {
        const project = req.body;
        const savedProject = await employeeServices.create(project);
        setResponse(savedProject, res);
    } catch (error) {
        if (error.code === 11000) {
            setError('Duplicate username or email found in Database', res);
        }

    }
})

//Update Project API
export const putProject = (async (req, res) => {
    try {
        const id = req.params.id;      // Get id from param
        const query = req.body;         // Get request body
        const updatedProject = await employeeServices.update(id, query);   // Pass it to services for further computation
        setResponse(updatedProject, res);     // Send response back
    } catch (error) {
        setError(error, res);
    }
})

//Delete project API
export const removeProject = (async (req, res) => {
    try {
        const id = req.params.id;    // Get id from param
        const deletedProject = await employeeServices.remove(id);   // Pass it to services for further computation
        setResponse(deletedProject, res);        // Set response
    } catch (error) {
        setError(error, res);
    }
})

//Fetch projects API
export const getProjects = async (req, res) => {
    try {
        const manager_id = req.params.username;
        const data = await employeeServices.view(manager_id);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(data);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Get employees by role API
export const getEmployeeByRole = async (req, res) => {
    try {
        const role = req.params.role
        const data = await employeeServices.viewEmployeeByRole(role);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(data);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Get projects by ID
export const getProjectById = async (req, res) => {
    try {
        const id = req.params.id
        const projectsByID = await employeeServices.viewProjectsByID(id);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(projectsByID);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Get projects by title API
export const getProjectByTitle = async (req, res) => {
    try {
        const title = req.params.title
        const data = await employeeServices.viewProjectsByTitle(title);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(data);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Get projects by status
export const getProjectByStatus = async (req, res) => {
    try {
        const status = req.params.status
        const data = await employeeServices.viewProjectsByStatus(status);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(data);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id
        const employeeByID = await employeeServices.viewEmployeeByID(id);    // Pass it to services for further computation
        res.status(200);          // Set status code to 200
        res.json(employeeByID);          // Send response back
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

//Retrieve projects for pagination
export const getProjectsByPagination = async (req, res, next) => {
    const manager_id = req.params.username;
    const data = await employeeServices.view(manager_id);
    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pageSize = 6;
    const pager = paginate(data.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);
    const responseData = [{pager, pageOfItems}];

    // return pager object and current page of items
    return res.json(responseData);
}