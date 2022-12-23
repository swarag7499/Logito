import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./EmployeeLogin.scss";
import {login} from "../../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

//Employee Login component
const EmployeeLogin = (props) => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [emailID, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, message} = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    //Set email ID state
    const onChangeUsername = (e) => {
        const emailID = e.target.value;
        setUsername(emailID);
    };

    //Set password state
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    //Call Login API
    const handleLogin = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(emailID, password))
                .then(() => {
                    navigate("/employee/dashboard");
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="employee-login-0background">
            <div className="">
                <Form className="employee-login-form" onSubmit={handleLogin} ref={form}>
                    <h3>Login</h3>
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
                            value={emailID}
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
        </div>
    );
};

export default EmployeeLogin;