import {ActionType} from '../actions/auth';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? {isLoggedIn: true, user, message: ''}
    : {isLoggedIn: false, user: null, message: ''};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };

        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
       
        case ActionType.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case ActionType.SET_MESSAGE:
            return {message: payload}
        default:
            return state;
    }
}