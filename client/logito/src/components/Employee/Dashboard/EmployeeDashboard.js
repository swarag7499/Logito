import React, {useEffect, useState, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AllCall} from '../../../services/api';
import countProjectStatus from '../../../services/countProjectStatus';
import getProjectStatistics from '../../../services/getProjectStats';
import getUpcomingDueProjects from '../../../services/getUpcomingDueProjects';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import './EmployeeDashboard.scss';
import NavBar from '../NavBar/NavBar';

ChartJS.register(ArcElement, Tooltip, Legend);
const mapStateToProps = state => ({
    projects: {
        error: state.projectReducer.error,
        projectsList: state.projectReducer.projectsList,
    }
});


//Employee Dashboard Component
function EmployeeDashboard(props) {
    let ref = useRef(null);
    const downloadImage = useCallback(() => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = ref.current.toBase64Image();
        link.click();
    }, []);
    const {getAll} = props;
    const [projects, setProjects] = useState([])

    useEffect(() => {
        (async () => {
            try {
                getAll('project').then((response) => {
                    const data = response
                    setProjects(data)
                })
            } catch (error) {
                console.log(error)
            }
        })();
    }, [getAll]);
    return (

        <div class="grid-container">
            <NavBar></NavBar>
            <main class="main-container">
                <>
                    <div class="main-cards">

                        <div class="card">
                            <div class="card-inner">
                                <p class="text-primary">Total Projects</p>
                                <span class="material-icons-outlined text-blue">inventory_2</span>
                            </div>
                            <span class="text-primary font-weight-bold">{projects.length}</span>
                        </div>

                        <div class="card">
                            <div class="card-inner">
                                <p class="text-primary">COMPLETE</p>
                                <span class="material-icons-outlined text-green">done_outline</span>
                            </div>
                            <span
                                class="text-primary font-weight-bold">{countProjectStatus(props.projects.projectsList, 'Complete')}</span>
                        </div>

                        <div class="card">
                            <div class="card-inner">
                                <p class="text-primary">STANDBY</p>
                                <span class="material-icons-outlined text-orange">pending_actions</span>
                            </div>
                            <span
                                class="text-primary font-weight-bold">{countProjectStatus(props.projects.projectsList, 'Standby')}</span>
                        </div>

                        <div class="card">
                            <div class="card-inner">
                                <p class="text-primary">INCOMPLETE</p>
                                <span class="material-icons-outlined text-red">info</span>
                            </div>
                            <span
                                class="text-primary font-weight-bold">{countProjectStatus(props.projects.projectsList, 'Incomplete')}</span>
                        </div>


                    </div>
                    <div class="charts">

                        <div class="charts-card">
                            <div className="fieldViewDivForChart">
                                <p class="chart-title">Project Statistics</p>

                                <button className="downloadButton" type="button" onClick={downloadImage}><span
                                    class="material-icons-outlined">download</span></button>
                            </div>
                            <div id="bar-chart_1"><Doughnut ref={ref}
                                                            data={getProjectStatistics(props.projects.projectsList)}/>
                            </div>

                        </div>

                        <div class="alerts">
                            <p class="chart-title">Upcoming deadlines!!!</p>
                            <div className="divAlerts">
                                <ol class="olAlerts">
                                    {getUpcomingDueProjects(props.projects.projectsList).map((project) => (
                                        <li className="liAlertUi">The Project<b> {project.title}</b> is due
                                            on {project.deadline}</li>
                                    ))}
                                </ol>
                            </div>

                        </div>

                    </div>
                </>
            </main>

        </div>
    );

}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAll: AllCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
