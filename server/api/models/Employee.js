import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required'
    },
    last_name: {
        type: String,
        required: 'Last name is required'
    },
    personal_email: {
        type: String,
        required: 'Personal email ID is required',
        unique: true
    },
    role: {
        type: String,
        required: 'Role is required'
    },
    username: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    domain: {
        type: String,
        required: 'domain is required'
    },
    emailID: {
        type: String,
        required: 'Email ID is required',
        unique: true
    },
    phone_number: {
        type: Number,
        required: 'Phone number is required'
    },
    start_date: {
        type: Date,
        required: 'Start date is required'
    },
    imageUrl:{ type: String},
    token: {
        type: String
    }
}, {versionKey: false})

schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const employee = mongoose.model('employee', schema);
export default employee;