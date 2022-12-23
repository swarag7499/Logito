export const AdminActionType = {
    GET_ALL_PROJECTS: 'GET_ALL_PROJECTS',
    PROJECTS_PENDING: 'PROJECTS_PENDING',
    EMPLOYEE_ERROR: 'EMPLOYEE_ERROR',
    GET_SINGLE_PROJECT: 'GET_SINGLE_PROJECT',
    CREATE_EMPLOYEE: 'CREATE_EMPLOYEE',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT'
}

export const getAllProjects = projectsList => ({
    type: AdminActionType.GET_ALL_PROJECTS,
    projectsList,
});

export const getSingleProject = project => ({
    type: AdminActionType.GET_SINGLE_PROJECT,
    project,
});

export const createEmployee = employee => ({
    type: AdminActionType.CREATE_EMPLOYEE,
    employee
});

export const updateProject = (project, id) => ({
    type: AdminActionType.UPDATE_PROJECT,
    project,
    id,
});

export const deleteProject = id => ({
    type: AdminActionType.DELETE_PROJECT,
    id
});

export const employeeError = error => ({
    type: AdminActionType.EMPLOYEE_ERROR,
    error,
});
