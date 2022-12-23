import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCall} from '../../../../services/api';
import {Link} from "react-router-dom";
import useStyles from './projectStyles';
import './projectStyle.scss';
import {Card, Button} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import moment from 'moment';

//View Project
function Project({props, project}) {
    const classes = useStyles();

    //Calls delete API
    const handleDelete = async (e, project) => {
        const {deleteCall} = props
        try {
            await deleteCall(e)
            window.location.reload(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className={classes.card}>
            <div className="carViewViewProjects">

                <div className="divideTitleDeadline">
                    <div className="projectTitleCard">
                        {project.title}
                    </div>
                    <div className="projectStatusCard">
                        {project.status}
                    </div>
                </div>
                <div className="projectDeadlineCard">
                    Deadline: {moment(project.deadline).fromNow()}
                </div>
                <div className="projectDetailCard">
                    Description: {project.description}
                </div>
                <div className="projectMembersCard">
                    Team Members: {project.team_members.map((tag) => `#${tag} `)}
                </div>
                <div className="carViewButtons">
                    <div className="updateButtonCard">
                        <Button size="small" color="primary"><UpdateIcon fontSize="small"/>
                            <Link
                                to={`/employee/updateProject/${project._id}`}
                                state={{project: project}}
                                id="list-home-list-card"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                Edit Project
                            </Link>
                        </Button>
                    </div>
                    <div className="deleteButtonCard">
                        <Button size="small" color="primary"
                                onClick={e => window.confirm("Are you sure you want to delete this project?") &&
                                    handleDelete(project)}><DeleteIcon fontSize="small"/> Delete Project
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    deleteCall: deleteCall,
}, dispatch);

export default connect(null, mapDispatchToProps)(Project);