/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import {ProjectActionType} from '../actions/projects';

const initialStateProjects = {
    error: null,
    pending: false,
    projectsList: [],
    project: {},
};

const projectReducer = (state = initialStateProjects, action) => {
    switch (action.type) {
        case ProjectActionType.GET_ALL_PROJECTS:
            return {
                ...state,
                pending: false,
                projectsList: action.projectsList,
            };
        case ProjectActionType.PROJECTS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case ProjectActionType.PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case ProjectActionType.GET_SINGLE_PROJECT:
            return {
                ...state,
                pending: false,
                project: action.project,
            };
        case ProjectActionType.CREATE_PROJECT:
            return {
                ...state,
                pending: false,
                projectsList: [...state.projectsList, action.project],
                project: action.project,
            };
        case ProjectActionType.UPDATE_PROJECT:
            return {
                ...state,
                pending: false,
                projectsList: state.projectsList.map(project => {
                    project._id === action.id ? project = action.project : project
                }),
                project: action.project
            };
        case ProjectActionType.DELETE_PROJECT:
            return {
                ...state,
                pending: false,
                projectsList: state.projectsList.filter(project => project._id !== action.id),
                project: {},
            };
        default:
            return state;
    }
};

export default projectReducer;