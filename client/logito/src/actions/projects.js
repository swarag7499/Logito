export const ProjectActionType = {
    GET_ALL_PROJECTS: 'GET_ALL_PROJECTS',
    PROJECTS_PENDING: 'PROJECTS_PENDING',
    PROJECTS_ERROR: 'PROJECTS_ERROR',
    GET_SINGLE_PROJECT: 'GET_SINGLE_PROJECT',
    CREATE_PROJECT: 'CREATE_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT'
}

export const getAllProjects = projectsList => ({
    type: ProjectActionType.GET_ALL_PROJECTS,
    projectsList,
});

export const getSingleProject = project => ({
    type: ProjectActionType.GET_SINGLE_PROJECT,
    project,
});

export const createProject = project => ({
    type: ProjectActionType.CREATE_PROJECT,
    project
});

export const updateProject = (project, id) => ({
    type: ProjectActionType.UPDATE_PROJECT,
    project,
    id,
});

export const deleteProject = id => ({
    type: ProjectActionType.DELETE_PROJECT,
    id
});

export const projectsError = error => ({
    type: ProjectActionType.PROJECTS_ERROR,
    error,
});

export const projectsPending = () => ({
    type: ProjectActionType.PROJECTS_PENDING,
});