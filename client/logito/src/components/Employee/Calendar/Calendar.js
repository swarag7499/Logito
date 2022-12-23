import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {bindActionCreators} from 'redux';
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "./custom.scss";
import {AllCall} from '../../../services/api';
import {connect} from 'react-redux';
import getIncompleteProjectDeadlines from '../../../services/events';
import NavBar from '../NavBar/NavBar';

const mapStateToProps = state => ({
    projects: {
        error: state.projectReducer.error,
        projectsList: state.projectReducer.projectsList,
    }
});

//Calendar View Component
function Calendar(props) {

    const {getAll} = props;
    const [projects, setProjects] = useState([])

    useEffect(() => {
        (async () => {
            try {
                getAll('project').then((response) => {
                    const data = response;
                    setProjects(data);
                })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [getAll]);

    return (
        <div className="grid-container">
            <NavBar></NavBar>
            <div className="calendar-view">
                <FullCalendar
                    defaultView="dayGridMonth"
                    timeZone="UTC"
                    timeZoneParam="UTC"
                    plugins={[dayGridPlugin]}
                    events={getIncompleteProjectDeadlines(props.projects.projectsList)}
                />
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAll: AllCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);