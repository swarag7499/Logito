import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String
    }
});


const admin = mongoose.model("admin", schema);

export default admin