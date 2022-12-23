import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useLocation} from "react-router-dom";
import {ViewEmployees, UpdateProject} from '../../../services/api';
import '../CreateProject/CreateProject.scss';
import './UpdateProject.scss';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../NavBar/NavBar";

// Update Project Form Component
function UpdateProjectComponent(props) {

    let location = useLocation();
    const project = location.state.project;
    const [projectData, setProjectData] = useState(project);
    const {getEmployee} = props;

    useEffect(() => {
        // if (project) setProjectData(project);
    }, [location]);

    //Sets the state to data from user input
    const handleChange = (event) => {
        if (event.target.name === 'status') {
            setProjectData({...projectData, [event.target.name]: event.target.value})
        }
        if (event.target.name === 'team_members') {
            const team = [];
            team.push(event.target.value);
            setProjectData({...projectData, team_members: team});
        } else {
            setProjectData({...projectData, [event.target.name]: event.target.value})
        }
    }

    //Calls the update API
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {updateProject} = props;

        try {
            const formData = projectData;
            await updateProject('project', formData).then((response) => {
                toast.success('Project Updated Successfully !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })


        } catch (error) {
            toast.error('Error in updating !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(error)
        }
    }


    return (
        <div className="grid-container">
            <NavBar></NavBar>
            <p id="createProjectTitle">Update Project</p>
            <form class="formDiv" onSubmit={handleSubmit}>


                <div class="inputFieldUpdate">
                    <input className="input4" type="text" required spellCheck="false"
                           defaultValue={projectData.title}
                           name="title"
                           onChange={handleChange}/>
                    <label className="labelUpdateProject">Project Name</label>
                </div>
                <br></br>

                <div class="inputFieldUpdate">
                    <input className="input4" type="text" required spellCheck="false"
                           defaultValue={projectData.description}
                           name="description"
                           onChange={handleChange}/>
                    <label className="labelUpdateProject">Project Description</label>
                </div>
                <br></br>


                <div class="inputFieldUpdate">
                    <input className="input4" type="text" required spellCheck="false"
                           placeholder="Enter project status(Incomplete, Complete, Standby)"
                           defaultValue={projectData.status}
                           name="status"
                           onChange={handleChange}/>
                    <label className="labelUpdateProject">Status</label>
                </div>


                <br></br>


                <div class="inputFieldUpdate">
                    <input className="input4" type="textarea" required spellCheck="false"
                           defaultValue={projectData.team_members}
                           name="team_members"
                           onChange={handleChange}/>
                    <label className="labelUpdateProject">Team Members: </label>
                </div>

                <br></br>

                <button className="submitButton" type="submit">
                    Update
                </button>

                <ToastContainer/>
            </form>
        </div>
    );

};

const mapStateToProps = state => ({
    projects: {
        error: state.projectReducer.error,
        projectsList: state.projectReducer.projectsList,
    }
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getEmployee: ViewEmployees,
    updateProject: UpdateProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectComponent);