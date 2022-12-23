import React from "react";
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CreateEmployeeCall, uploadImg} from '../../../services/api';
import './AdminDashboard.scss';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AdminNavBar from "../NavBar/AdminNavBar";

// import "react-select/dist/react-select.css";

//Admin Dashboard component
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            role: '',
            username: '',
            password: '',
            domain: '',
            emailID: '',
            personal_email: '',
            phone_number: '',
            start_date: '',
            image: '',
            imageURL: '',
            presets: 'wcchudyz',
            url: 'https://api.cloudinary.com/v1_1/dqyjbfoyi/upload'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Set state to user input data
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    }
    //Set image uploaded in the state
    onChange = (e) => {
        this.state.image = e.target.files[0];
    };

    //Calls the upload Image API
    uploadImage = async () => {
        const {uploadImg} = this.props;
        const formData = new FormData();
        formData.append('file', this.state.image);
        formData.append('upload_preset', this.state.presets);
        try {
            let imageUrl;
            await uploadImg(this.state.url, formData).then((res) => {
                imageUrl = res.data.secure_url;
            });

            this.state.imageURL = imageUrl;
        } catch (err) {
            console.error(err);
        }
    };

    //Calls create employee API
    async handleSubmit(event) {
        event.preventDefault();
        const {createEmployee} = this.props;
        await this.uploadImage();
        try {

            const formData = this.state;
            await createEmployee(formData).then((response) => {
                toast.success('Employee Created Successfully !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        } catch (error) {
            toast.error('Error in creating !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }


    render() {
        return (
            <div className="grid-container"><AdminNavBar></AdminNavBar>
                <div className="create-employee-form"><h2 className="createEmpTitle">Create Employee</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="fieldViewDiv">
                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                    // placeholder="Enter employee firstname"
                                       defaultValue={this.state.first_name}
                                       name="first_name"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee Firstname</label>
                            </div>

                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                    // placeholder="Enter employee lastname"
                                       defaultValue={this.state.last_name}
                                       name="last_name"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee Lastname</label>
                            </div>
                        </div>

                        <div className="fieldViewDiv">
                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                    // placeholder="Enter employee username"
                                       defaultValue={this.state.username}
                                       name="username"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee username</label>
                            </div>


                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                    // placeholder="Enter employee role"
                                       defaultValue={this.state.role}
                                       name="role"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee role</label>
                            </div>

                        </div>


                        <div className="fieldViewDiv">
                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                       defaultValue={this.state.domain}
                                    // placeholder="Enter employee domain"
                                       name="domain"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee domain</label>
                            </div>


                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                       defaultValue={this.state.emailID}
                                    // placeholder="Enter employee official email id"
                                       name="emailID"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee Official Email ID</label>
                            </div>
                        </div>


                        <div className="fieldViewDiv">
                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                       defaultValue={this.state.personal_email}
                                    // placeholder="Enter employee persoanl email id"
                                       name="personal_email"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee Personal Email ID</label>
                            </div>


                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                       defaultValue={this.state.phone_number}
                                    // placeholder="Enter employee phone number"
                                       name="phone_number"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee Phone Number</label>
                            </div>
                        </div>


                        <div className="fieldViewDiv">
                            <div class="input-field-admin">
                                <input className="input2" type="text" required spellCheck="false"
                                       defaultValue={this.state.password}
                                    // placeholder="Enter employee password"
                                       name="password"
                                       onChange={this.handleChange}/>
                                <label class="labelAdminDashboard">Employee password</label>
                            </div>

                            <div className="dateFieldPosition">
                                <label id="labelDate">Employee Start Date</label>
                                <input className="dateField"
                                       type="date"
                                       defaultValue={this.state.start_date}
                                       placeholder="Enter employee start date"
                                       name="start_date"
                                       onChange={this.handleChange}/>

                            </div>
                        </div>

                        <div class="alignTheSubmitButton">
                            <div className="form-group_1">
                                <input type='file' className="uploadImage" name='image' onChange={this.onChange}/>
                                {/* <button onClick={this.onSubmit} className='btn center'>upload</button> */}
                            </div>
                            <div>
                                <button className="submitButtonAdmin" type="submit">
                                    Create Employee
                                </button>
                            </div>
                        </div>
                        <ToastContainer/>
                    </form>
                </div>
            </div>
        );
    };
};


const mapStateToProps = state => ({
    employee: {
        error: state.adminReducer.error,
        employeeList: state.adminReducer.employeeList,
    }
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createEmployee: CreateEmployeeCall,
    uploadImg: uploadImg
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);