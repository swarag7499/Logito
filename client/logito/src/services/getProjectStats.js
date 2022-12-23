function getProjectStatistics(array) {
    let completeProjects = 0;
    let incompleteProjects = 0;
    let standbyProjects = 0;
    const data = {
        labels: ['Incomplete', 'Standby', 'Completed'],
        datasets: [
            {
                label: '# of Projects',
                data: [],
                backgroundColor: [
                    'rgb(253,98,94)',
                    'rgb(55,70,73)',
                    'rgb(6,184,170)'
                ],
                borderColor: [
                    'rgba(255,7,0,0.96)',
                    'rgba(45,55,55,0.94)',
                    'rgba(1,246,226,0.76)'
                ],
                borderWidth: 1,
            },
        ],
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i].status === 'Complete') {
            completeProjects++;
        } else if (array[i].status === 'Incomplete') {
            incompleteProjects++;
        } else if (array[i].status === 'Standby') {
            standbyProjects++
        }
    }
    data.datasets[0].data.push(incompleteProjects);
    data.datasets[0].data.push(standbyProjects);
    data.datasets[0].data.push(completeProjects);
    return data;
};

export default getProjectStatistics;