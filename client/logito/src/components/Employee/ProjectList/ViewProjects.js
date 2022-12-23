import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProjectsviaPagination, deleteCall} from '../../../services/api';
import {Grid} from '@material-ui/core';
import useStyles from '../styles.js';
import Project from './Project/Project';
import NavBar from '../NavBar/NavBar';
import {Link, useLocation} from "react-router-dom";
import './ViewProjects.scss'

const mapStateToProps = state => ({
    projects: {
        error: state.projectReducer.error,
        projectsList: state.projectReducer.projectsList,
    }
});

//View List of Projects
function ViewProjects(props) {
    const {getProjectsviaPagination, deleteCall} = props;
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [pager, setPager] = useState({})
    const [pageOfItems, setPageOfItems] = useState([])
    let location = useLocation();

    useEffect(() => {

        loadPage();
    });

    //Calls project pagination API 
    function loadPage() {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        const token = JSON.parse(localStorage.getItem('user'));
        const username = token.username;
        if (page !== pager.currentPage) {
            getProjectsviaPagination(page).then((response) => {
                setPageOfItems(response[0].pageOfItems);
                setPager(response[0].pager);
            });
        }
    }

    return !pageOfItems.length ? <><NavBar></NavBar>Nothing to show </> : (
        <>
            <div className="grid-container_viewProjects">
                <NavBar></NavBar>
                <Grid className={classes.container} container alignItems="stretch" spacing={4}>
                    {pageOfItems.map((project) => (
                        <Grid key={project._id} item xs={12} sm={6} md={6}>
                            <Project props={props} project={project}/>
                        </Grid>
                    ))}

                    <div className="card-pagination">
                        {pager.pages && pager.pages.length &&
                            <ul className="pagination">
                                <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{search: `?page=1`}} className="page-link">First</Link>
                                </li>
                                <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{search: `?page=${pager.currentPage - 1}`}}
                                          className="page-link">Previous</Link>
                                </li>
                                {pager.pages.map(page => <li key={page}
                                                             className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                        <Link to={{search: `?page=${page}`}} className="page-link">{page}</Link>
                                    </li>
                                )}
                                <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{search: `?page=${pager.currentPage + 1}`}}
                                          className="page-link">Next</Link>
                                </li>
                                <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{search: `?page=${pager.totalPages}`}} className="page-link">Last</Link>
                                </li>
                            </ul>}
                    </div>

                </Grid>
            </div>

        </>
    );

}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteCall: deleteCall,
    getProjectsviaPagination: getProjectsviaPagination
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjects);