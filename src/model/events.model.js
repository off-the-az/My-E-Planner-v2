const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Events = new Schema({
    event_type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    begin: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    end: {
        type: Date,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = mongoose.model('Events', Events)