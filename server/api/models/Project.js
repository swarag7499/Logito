import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    team_members: {
        type: [String],
        required: '1 or more team members are required'
    },
    deadline: {
        type: Date,
        required: 'Deadline is required'
    },
    status: {
        type: String,
        default: 'Incomplete'
    },
    project_manager_username: {
        type: String
    }
}, {versionKey: false})


const project = mongoose.model('project', schema);
export default project;