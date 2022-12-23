/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import {AdminActionType} from '../actions/admin';

const initialStateProjects = {
    error: null,
    pending: false,
    employeeList: [],
    employee: {},
};

const adminReducer = (state = initialStateProjects, action) => {
    switch (action.type) {
        case AdminActionType.EMPLOYEE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case AdminActionType.CREATE_EMPLOYEE:
            return {
                ...state,
                pending: false,
                employeeList: [...state.employeeList, action.employee],
                employee: action.employee,
            };
        default:
            return state;
    }
};

export default adminReducer;