import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {adminlogin} from "../../../actions/adminAuth";
import "./AdminLogin.scss"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

//Admin Login Page Component
const AdminLogin = (props) => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, message} = useSelector(state => state.adminauthReducer);
    const dispatch = useDispatch();

    //Accept username from admin
    const onChangeUsername = (e) => {
        const email = e.target.value;
        setUsername(email);
    };

    //Accepts password from user
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    //Calls the login API
    const handleLogin = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(adminlogin(email, password))
                .then(() => {
                    navigate('/admin/dashboard');
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };


    return (
        props.isVisible ? (
            <div className="">
                <div className="">
                    <Form className="employee-login-form" onSubmit={handleLogin} ref={form}>
                        <h3> Admin Login</h3>
                        {message && (
                            <div className="form-group">
                                <div className="error-message" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className=" field">
                            <label htmlFor="username">Email ID</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={email}
                                onChange={onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group field">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <button className="login">Login</button>


                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                    </Form>
                </div>
                <br></br><br></br><br></br><br></br><br></br>
            </div>) : ""
    );
};

export default AdminLogin;