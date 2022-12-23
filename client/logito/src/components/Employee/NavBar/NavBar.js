import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from '../../../actions/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from "moment";
import './NavBar.scss';
import {getProfile} from '../../../services/api';

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: logout,
    getAll: getProfile
}, dispatch);

const mapStateToProps = state => ({
    profile: {
        error: state.profileReducer.error,
        profile: state.profileReducer.profile,
    }
});

//Employee NavBar component
class NavBarComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            active: false,
            profile: {}
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount = () => {
        const {getAll} = this.props;
        try {
            getAll().then((response) => {
                const data = response
                
                this.setState({profile: data[0]})
            })
        } catch (error) {
            console.log(error)
        }

    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    };


    //Calls logout action
    handleLogout() {
        this.props.logout();
    }

    render() {

        return (
            <>
                <header class="header">
                    <div class="menu-icon">
                        <span class="material-icons-outlined"></span>
                    </div>
                    <div class="header-left">
                        <h3 class="h3FontForNavBar">Hi {this.state.profile.first_name} !</h3>
                    </div>
                    <div>
                        <span><b className="TimeFormat">{moment().format('MMMM Do YYYY,h:mm A')}</b>

                        </span>

                    </div>
                    <div class="header-right">

                        <Link
                            to='/employee/dashboard'
                            id="list-home-list"
                            data-toggle="list"
                            role="tab"
                            aria-controls="home"
                        >
                            <span class="material-icons-outlined" id="topNavBarIcons_1">notifications</span>
                        </Link>
                        <a href="client/logito/src/components/Employee/NavBar?nocheckbrowser" target="_blank">
                            <span class="material-icons-outlined" id="topNavBarIcons_1">email</span>
                        </a>

                        <Link
                            to='/employee/profile'
                            id="list-home-list"
                            data-toggle="list"
                            role="tab"
                            aria-controls="home"
                        >
                            <span class="material-icons-outlined" id="topNavBarIcons_1">person</span>
                        </Link>
                    </div>
                </header>

                <aside id="sidebar">
                    <div class="sidebar-title">
                        <div class="sidebar-brand">
                            <span class="material-icons-outlined">inventory</span> Logito
                        </div>
                        <span class="material-icons-outlined" onclick="closeSidebar()">close</span>
                    </div>

                    <ul class="sidebar-list">
                        <li className="sidebar-list-item">


                            <Link
                                to="/employee/dashboard "
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                <span class="material-icons-outlined">dashboard</span>
                                Dashboard
                            </Link>

                        </li>
                        <li class="sidebar-list-item">

                            <Link
                                to='/employee/createProject'
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                <span class="material-icons-outlined">add_box</span>
                                Create Project
                            </Link>
                        </li>
                        <li class="sidebar-list-item">

                            <Link

                                to='/employee/viewProjects'
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                <span class="material-icons-outlined">fact_check</span>
                                View Projects
                            </Link>
                        </li>
                        <li class="sidebar-list-item">

                            <Link

                                to='/employee/profile'
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                <span class="material-icons-outlined">person</span>
                                Profile
                            </Link>
                        </li>

                        <li class="sidebar-list-item">

                            <Link

                                to='/employee/calendar'
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                <span class="material-icons-outlined">calendar_month</span>
                                Calendar
                            </Link>
                        </li>
                        <li class="sidebar-list-item">

                            <Link

                                to='/login'
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                                onClick={() => this.handleLogout()}
                            >
                                <span class="material-icons-outlined">logout</span>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </aside>
            </>)

    }
};
const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
export default NavBar;