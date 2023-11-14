const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
        name: {
            type: String, 
            // required: true
        },
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        description: {
            type: String,
        },
        time: {
            type: String,
        },
        priority: {
            type: String,
        },
        image: {
            type: String,
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);