const mongoose = require('mongoose');

const chatRuleSchema = new mongoose.Schema({
    keyword: { type: String, required: true },
    action: { 
        type: String, 
        enum: ['navigate', 'message', 'popup'], 
        default: 'message' 
    },
    value: { type: String, required: true } // URL, Response Text, or Popup ID
});

const chatConfigSchema = new mongoose.Schema({
    greetingMessage: { 
        type: String, 
        default: "Hi! I'm your AI assistant. How can I help you today?" 
    },
    voiceMessage: { 
        type: String, 
        default: "Hi, I am your AI assistant. Welcome to Prime Impact Solutions." 
    },
    enabled: { type: Boolean, default: true },
    rules: [chatRuleSchema]
}, { timestamps: true });

module.exports = mongoose.model('ChatConfig', chatConfigSchema);
