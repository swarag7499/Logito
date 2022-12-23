import * as adminServices from './../services/admin-services.js';
import {response} from "express";
import Admin from './../models/Admin.js';
import * as auth from './../middleware/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const setResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

const setError = (err, response) => {
    response.status(500);
    response.json(err);

}

//Admin Login API
export const login = (async (req, res, next) => {
    try {

        const {email, password} = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
            // setError()
        }
        // Validate if admin exists
        const admin = await Admin.findOne({email});

        if (admin && (await bcrypt.compare(password, admin.password))) {
            // Create token3
            const token = jwt.sign(
                {admin_id: admin._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            admin.token = token;

            // user
            res.status(200).json(admin);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

//Create Employee API
export const post = (auth, async (req, res) => {
    try {
        const employee = req.body;
        const savedEmployee = await adminServices.create(employee);
        setResponse(savedEmployee, res);
    } catch (error) {
        if (error.code === 11000) {
            setError('Duplicate username or email found in Database', res);
        }

    }
})