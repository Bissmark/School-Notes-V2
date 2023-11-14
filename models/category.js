const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        time: {
            type: String,
            default: 'Slow'
        },
        priority: {
            type: String,
            default: 'low'
        },
        position: {
            type: {
                x: Number,
                y: Number
            },
            default: { x: 0, y: 0 }
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);