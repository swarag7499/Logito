/* eslint-disable no-plusplus */

/* eslint-disable no-param-reassign */

//Get list of upcoming projects whose deadline is in the coming week
function getUpcomingDueProjects(array) {
    let projects = [];
    const sevenDaysAgo = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const todaysDate = new Date();
    for (let i = 0; i < array.length; i++) {
        if (array[i].status === 'Incomplete') {
            if (new Date(array[i].deadline).getTime() <= sevenDaysAgo.getTime() && new Date(array[i].deadline).getTime() > todaysDate.getTime()) {
                const obj ={}
                obj.title = array[i].title;
                let deadlineDate = new Date((array[i].deadline)).toUTCString();
                deadlineDate = deadlineDate.split(' ').slice(0, 4).join(' ');
                obj.deadline = deadlineDate;
                projects.push(obj);
            }
        }
    }

    return projects;
};

export default getUpcomingDueProjects;