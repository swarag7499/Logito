import NavBar from '../NavBar/NavBar';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile} from '../../../services/api';
import contact from '../../public/image/avatar.jpg';
import './EmployeeProfile.scss';

const mapStateToProps = state => ({
    profile: {
        error: state.profileReducer.error,
        profile: state.profileReducer.profile,
    }
});

//Employee Profile page Component
function EmployeeProfile(props) {
    const {getAll} = props;
    const [profile, setProfile] = useState([])

    useEffect(() => {
        (async () => {
            try {
                getAll().then((response) => {
                    const data = response
                    setProfile(data)
                })
            } catch (error) {
                console.log(error)
            }
        })();
    }, [getAll]);

    return Object.keys(props.profile.profile).length === 0 ?
        <div className="d-flex justify-content-center align-items-center w-100">Nothing to show</div> : (
            <div className="grid-container">
                <NavBar></NavBar>
                <div className={`grey-bg container-fluid`}>
                    <div class="cardEmpProfile">
                        <div class="card-header">
                            <img src={props.profile.profile[0].imageUrl ? props.profile.profile[0].imageUrl : contact}
                                 alt="Profile Image" className="profile-img"/>

                        </div>
                        <div class="card-body">
                            <h2 class="name">{props.profile.profile[0].first_name ? props.profile.profile[0].first_name : ''}{" "}{props.profile.profile[0].last_name}</h2>

                            <h4 class="detailText"> Username: {props.profile.profile[0].username ? props.profile.profile[0].username : ''}</h4>
                            <h4 class="detailText"> EmailID: {props.profile.profile[0].emailID ? props.profile.profile[0].emailID : ''}</h4>
                            <h4 class="detailText"> Joined
                                on: {props.profile.profile[0].start_date ? props.profile.profile[0].start_date : ''}</h4>
                            <h4 class="detailText"> Role: {props.profile.profile[0].role ? props.profile.profile[0].role : ''}</h4>
                            <h4 class="detailText"> Domain: {props.profile.profile[0].domain ? props.profile.profile[0].domain : ''}</h4>
                            <h4 class="detailText"> Phone
                                number: {props.profile.profile[0].phone_number ? props.profile.profile[0].phone_number : ''}</h4>
                        </div>

                        <div class="social-links">
                            <a href="client/logito/src/components/Employee/EmployeeProfile#"
                               className="fab fa-github social-icon"></a>
                            <a href="client/logito/src/components/Employee/EmployeeProfile#"
                               className="fab fa-twitter social-icon"></a>
                            <a href="client/logito/src/components/Employee/EmployeeProfile#"
                               className="fab fa-youtube social-icon"></a>
                            <a href="client/logito/src/components/Employee/EmployeeProfile#"
                               className="fab fa-linkedin social-icon"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAll: getProfile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile);