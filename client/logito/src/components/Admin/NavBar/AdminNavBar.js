import React, {Component} from "react";
import {Link} from "react-router-dom";
import {adminlogout} from '../../../actions/adminAuth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './AdminNavBar.scss';
import {useDispatch, useSelector} from "react-redux";

const mapDispatchToProps = dispatch => bindActionCreators({
    adminlogout: adminlogout,
}, dispatch);


// Admin NavBar Component
class AdminNavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    };

    handleLogout() {
        this.props.adminlogout();
    }

    render() {

        return (
            <div>

                <aside class="sidebarAdminNavBar">
                    <div class="sidebar-title">
                        <div class="sidebar-brand">
                            <span class="material-icons-outlined">inventory</span> Logito
                        </div>
                        <span class="material-icons-outlined" onClick="closeSidebar()">close</span>
                    </div>

                    <ul class="sidebar-list">
                        <li className="sidebar-list-item">

                            <span class="material-icons-outlined">dashboard</span>
                            <Link

                                to='/admin/dashboard'
                                className=''
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                Dashboard
                            </Link>

                        </li>
                        <li className="sidebar-list-item">
                            <span class="material-icons-outlined">group</span>
                            <Link

                                to='#ViewEmployees'
                                className=''
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                            >
                                View Employees
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <span class="material-icons-outlined">logout</span>
                            <Link

                                to='/login'
                                className=''
                                id="list-home-list"
                                data-toggle="list"
                                role="tab"
                                aria-controls="home"
                                onClick={() => this.handleLogout()}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        )
    }
};
const AdminNavBar = connect(null, mapDispatchToProps)(AdminNavBarComponent);
export default AdminNavBar;