const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    is_hidden: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task', TaskSchema);