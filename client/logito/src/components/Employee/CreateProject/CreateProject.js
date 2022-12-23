import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CreateCall, ViewEmployees, UpdateProject} from '../../../services/api';
import Select from "react-select";
import './CreateProject.scss';
import NavBar from "../NavBar/NavBar";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Create Project Form Component
class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            status: '',
            deadline: new Date(),
            team_members: [],
            developers: [],
            testers: [],
            optionListDev: [],
            optionListTester: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const {getEmployee} = this.props;
        try {
            const employees = [];
            let developers;
            let testers;
            getEmployee('Developer').then((response) => {

                for (let i = 0; i < response.length; i++) {
                    this.state.optionListDev.push({value: response[i].username, label: response[i].username})
                }
            })
            getEmployee('Tester').then((response) => {
                for (let i = 0; i < response.length; i++) {
                    this.state.optionListTester.push({value: response[i].username, label: response[i].username})
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Set developers
    handleSelectDevelopers = (data) => {

        this.setState(state => {
            return {
                developers: data
            };
        });
        this.state.team_members.push(data[0].value);
    }

    //Set testers
    handleSelectTesters = (data) => {
        this.setState(state => {
            return {
                testers: data
            };
        });

        this.state.team_members.push(data[0].value);
    }

    //Set team members
    handleChange = (event) => {
        if (event.target.name === 'status') {
            this.setState({[event.target.name]: event.target.value});
        }
        if (event.target.name === 'team_members') {
            const team = [];
            team.push(event.target.value);
            this.state.team_members = team;
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    //Call create project API
    async handleSubmit(event) {
        event.preventDefault();
        const {createProject, updateProject} = this.props;

        try {

            const formData = this.state;
            await createProject('project', formData).then((response) => {
                toast.success('Project Created Successfully !', {
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
            <div className="grid-container">
                <NavBar></NavBar>
                <p id="createProjectTitle">Create Project</p>
                <form onSubmit={this.handleSubmit}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="input-field">
                        <input className="input3" type="text" required spellCheck="false"
                               name="title"
                               defaultValue={this.state.name}
                            // name="title"
                               onChange={this.handleChange}
                        ></input>
                        <label class="labelEmpDashboard">Project Name</label>
                    </div>

                    <br></br>

                    <div class="input-field">
                        <input className="input3" type="text" required spellCheck="false"
                               name="description"
                               defaultValue={this.state.description}
                            // name="title"
                               onChange={this.handleChange}
                        ></input>
                        <label class="labelEmpDashboard">Project Description</label>
                    </div>
                    <br></br>
                    <label id="projectStatusLabel">
                        Project Status
                    </label>

                    <div className="radioButton_create">
                        <label className="radioToggleCreate" htmlFor="html">Standby</label>
                        <input type="radio" className="radioToggle1" id="status" name="status" value="Standby"
                               onChange={this.handleChange}></input>
                    </div>

                    <div className="radioButton_create">
                        <label className="radioToggleCreate" htmlFor="css">Complete</label>
                        <input type="radio" className="radioToggle2" id="status" name="status" value="Complete"
                               onChange={this.handleChange}></input>
                    </div>

                    <div className="radioButton_create">
                        <label className="radioToggleCreate" htmlFor="javascript">Incomplete</label>
                        <input type="radio" className="radioToggle3" id="status" name="status" value="Incomplete"
                               onChange={this.handleChange}></input>
                    </div>

                    <br></br>
                    <label id="projectStatusLabel">Team Members: </label>
                    <div className="transparent">
                        <label className="Text2">Developers</label>

                        <Select

                            options={this.state.optionListDev}
                            placeholder="Select Developer"
                            value={this.state.developers}
                            onChange={this.handleSelectDevelopers}
                            isMulti/>
                    </div>
                    <label className="Text2">Testers</label>
                    <Select
                        options={this.state.optionListTester}

                        placeholder="Select Tester"
                        value={this.state.testers}
                        onChange={this.handleSelectTesters}
                        isSearchable={true}
                        isMulti/>


                    <label className="Text2">Deadline</label>
                    <input
                        type="date"
                        value={this.state.deadline}
                        name="deadline"
                        onChange={this.handleChange}/>


                    <button className="submitButton" type="submit">
                        Create
                    </button>
                    <ToastContainer/>
                </form>
            </div>
        );
    };
};


const mapStateToProps = state => ({
    projects: {
        error: state.projectReducer.error,
        projectsList: state.projectReducer.projectsList,
    }
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createProject: CreateCall,
    getEmployee: ViewEmployees,
    updateProject: UpdateProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);