import Project from './../models/Project.js';
import Employee from './../models/Employee.js';

//Create project functionality
export const create = async (project) => {
    const newProject = new Project(project);
    const newproject = newProject.save();
    return newproject;
}

//Update Project functionality
export const update = async (id, project) => {
    const updatedProject = Project.findByIdAndUpdate(id, project);
    return updatedProject;
}

//Delete project functionality
export const remove = async (id) => {
    const deletedProject = Project.findByIdAndDelete(id);
    return deletedProject;
}

//Get projects function
export const view = async (ProjectManagerid) => {
    const projects = Project.find({"project_manager_username":ProjectManagerid});
    return projects;
}

//Get projects by title from database
export const viewProjectsByTitle = async (title) => {
    const projects = Project.find({title: title});
    return projects;
}

//Get projects by status from database
export const viewProjectsByStatus = async (status) => {
    const projects = Project.find({status: status});
    return projects;
}

//get projects by ID from database
export const viewProjectsByID = async (id) => {
    const projectsById = Project.find({"_id": id});
    return projectsById;
}

//Fetch employees by role
export const viewEmployeeByRole = async (role) => {
    const employeeByRole = Employee.find({role: role});
    return employeeByRole;
}

//Fetch employees by ID from database
export const viewEmployeeByID = async (id) => {
    const employeeById = Employee.find({"_id": id});
    return employeeById;
}