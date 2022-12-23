import Employee from './../models/Employee.js';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

//Create Employee function
export const create = async (employee) => {
    const passwordToSend = employee.password;
    const newEmployee = new Employee(employee);
    // newEmployee.lastModified = new Date(Date.now());
    const newemp = newEmployee.save();

    //Send email funactionality
    // initialize nodemailer
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'adhyantini.logito@gmail.com',
                pass: 'wcnbsmrddpizhmom'
            }
        }
    );

// point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./api/views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./api/views/'),
    };

// use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))


    var mailOptions = {
        from: '"Admin" <adhyantini.logito@gmail.com>', // sender address
        to: (await newemp).personal_email, // list of receivers
        subject: 'Welcome!',
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            name: (await newemp).first_name, // replace {{name}} with Adebola
            company: 'Logito', // replace {{company}} with My Company
            email: (await newemp).emailID,
            username: (await newemp).username,
            password: passwordToSend
        }
    };

// trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    return newemp;
}