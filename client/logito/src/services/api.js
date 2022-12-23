import axios from "axios";
import * as projects from '../actions/projects';
import * as profile from '../actions/profile';
import * as admin from '../actions/admin';

const API_URL = "http://localhost:8080/";

//Employee Login API
const login = (emailID, password) => {
    return axios
        .post(API_URL + "employee/login", {
            emailID,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

//Admin Login API
const adminlogin = (email, password) => {
    return axios
        .post(API_URL + "admin/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("admin", JSON.stringify(response.data));
            }

            return response.data;
        });
};

//Employee Logout
const logout = () => {
  localStorage.removeItem("user");
};

const keepHomePageState=()=>{
  localStorage.setItem("proceededTo", 'homePage');
}

//Admin Logout API 
const adminlogout = () => {
  localStorage.removeItem("admin");
  // localStorage.removeItem("proceededTo");
};

//Get all projects API
export const AllCall = (route) => async dispatch => {
    const token = JSON.parse(localStorage.getItem('user'));
    const username = token.username;
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token.token
    }
    const url = `${API_URL + 'employee/' + route + '/' + username}`;
    try {

        dispatch(projects.projectsPending());

        return axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                dispatch(projects.getAllProjects(response.data));
                response = response.data;
                return response;
            });

    } catch (error) {
        dispatch(projects.projectsError(error));
    }
};

//View employees by a particular role API
export const ViewEmployees = (route) => async dispatch => {
    const token = JSON.parse(localStorage.getItem('user'));
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token.token
    }
    const url = `${API_URL + 'employee/project/role/' + route}`;
    try {
        return axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                response = response.data;
                return response;
            });

    } catch (error) {

        dispatch(projects.projectsError(error));

    }
};

//Create Project API
export const CreateCall = (route, data) => async dispatch => {
    const url = `${API_URL + 'employee/' + route}`;

    try {
        const token = JSON.parse(localStorage.getItem('user'));
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token.token
        }
        const title = data.title;
        const description = data.description;
        const status = data.status;
        const deadline = data.deadline;
        const username = token.username;
        return axios
            .post(url, {
                title,
                description,
                status,
                deadline,
                team_members: data.team_members,
                project_manager_username: username
            }, {headers})
            .then((response) => {

                dispatch(projects.createProject(response.data));

                return response.data;
            });

    } catch (error) {
        dispatch(projects.projectsError(error));

    }
};

//Upload Image to cloudinary API
export const uploadImg = (route, data) => async dispatch => {
    try {
        return axios.post(route, data).then((response) => {
                return response;
            });

    } catch (error) {

    }
};

//Delete project API call
export const deleteCall = (data) => async dispatch => {
    const projectID = data._id;
    const url = `${API_URL + 'employee/project/' + projectID}`;
    try {

        const token = JSON.parse(localStorage.getItem('user'));
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token.token
        }

        return axios
            .delete(url, {headers: headers})
            .then((response) => {
                dispatch(projects.deleteProject(response.data._id));
                return response.data;
            });

    } catch (error) {

        dispatch(projects.projectsError(error));

    }
};

//Update Project API call
export const UpdateProject = (route, data) => async dispatch => {
    const projectID = data._id;
    const url = `${API_URL + 'employee/project/' + projectID}`;

    try {

        const token = JSON.parse(localStorage.getItem('user'));
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token.token
        }
        const title = data.title;
        const description = data.description;
        const status = data.status;
        const deadline = data.deadline;
        const username = token.username;
        return axios
            .put(url, {
                title,
                description,
                status,
                deadline,
                team_members: data.team_members,
                project_manager_username: username
            }, {headers: headers})
            .then((response) => {
                dispatch(projects.updateProject(response.data, response.data._id));
                return response.data;
            });

    } catch (error) {

        dispatch(projects.projectsError(error));

    }
};

//Create Employee API
export const CreateEmployeeCall = (data) => async dispatch => {
    const url = `${API_URL + 'admin/employee'}`;
    try {
        const token = JSON.parse(localStorage.getItem('admin'));
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token.token
        }
        const imageUrl = data.imageURL;
        return axios
            .post(url, {
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                username: data.username,
                password: data.password,
                domain: data.domain,
                emailID: data.emailID,
                personal_email: data.personal_email,
                phone_number: data.phone_number,
                start_date: data.start_date,
                imageUrl

            }, {headers})
            .then((response) => {
                dispatch(admin.createEmployee(response.data));
                return response.data;
            });

    } catch (error) {
        dispatch(admin.employeeError(error));
    }
};

//Get Employee Profile API
export const getProfile = () => async dispatch => {
    const token = JSON.parse(localStorage.getItem('user'));
    const employeeID = token._id;
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token.token
    }
    const url = `${API_URL + 'employee/' + employeeID}`;
    try {

        dispatch(profile.profilesPending());

        return axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                dispatch(profile.getProfile(response.data));

                response = response.data;
                return response;
            });
    } catch (error) {
        dispatch(profile.profilesError(error));
    }
};

//Get projects via pagination API
export const getProjectsviaPagination = (page) => async dispatch => {
    const token = JSON.parse(localStorage.getItem('user'));
    const username = token.username;
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token.token
    }
    const url = `${API_URL + 'employee/' + '/project/items/' + username + '?page=' + page}`;
    try {
        return axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                response = response.data;
                return response;
            });
    } catch (error) {
        // dispatch(profile.profilesError(error));
    }
};

export default {
  login,
  logout,
  adminlogin,
  adminlogout,
  keepHomePageState
};