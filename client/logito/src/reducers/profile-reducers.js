/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import {ProfileActionType} from '../actions/profile';

const initialStateProjects = {
    error: null,
    pending: false,
    profile: {},
};

const profileReducer = (state = initialStateProjects, action) => {
    switch (action.type) {
        case ProfileActionType.GET_PROFILE:
            return {
                ...state,
                pending: false,
                profile: action.profile,
            };
        case ProfileActionType.PROFILE_PENDING:
            return {
                ...state,
                pending: true,
            };
        case ProfileActionType.PROFILE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default profileReducer;