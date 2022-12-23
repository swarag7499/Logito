/* eslint-disable no-plusplus */

/* eslint-disable no-param-reassign */

//Get list of incomplete project's deadlines to display on calendar
function getIncompleteProjectDeadlines(array) {
    let events = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i].status === 'Incomplete' || array[i].status === 'Standby') {
            let obj = {}
            obj.title = array[i].title
            obj.date = array[i].deadline
            events.push(obj);
        }
    }
  
    return events;
};

export default getIncompleteProjectDeadlines;