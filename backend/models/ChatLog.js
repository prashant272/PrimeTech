const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ['gemini', 'static', 'dynamic', 'rule'],
        default: 'gemini'
    },
    isTrained: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatLog', chatLogSchema);
