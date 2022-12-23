import {ActionType} from '../actions/adminAuth';

const user = JSON.parse(localStorage.getItem("admin"));
const initialState = user
    ? {adminisLoggedIn: true, user, message: ''}
    : {adminisLoggedIn: false, user: null, message: ''};


export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case ActionType.ADMINLOGIN_SUCCESS:
            return {
                ...state,
                adminisLoggedIn: true,
                user: payload.user,
            };
        case ActionType.ADMINLOGIN_FAIL:
            return {
                ...state,
                adminisLoggedIn: false,
                user: null,
            };
        case ActionType.ADMIN_LOGOUT:
            return {
                ...state,
                adminisLoggedIn: false,
                user: null,
            };
        case ActionType.ADMINSET_MESSAGE:
            return {message: payload}
        default:
            return state;
    }
}