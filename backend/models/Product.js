const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Mobility Services', 'Cloud Telephony Services', 'WhatsApp Services', 'Application'],
        default: 'Application'
    },
    icon: {
        type: String,
        default: 'Laptop'
    },
    heroDesc: {
        type: String
    },
    fullDesc: {
        type: String
    },
    detailedInfo: {
        type: String
    },
    whyChooseUs: [String],
    features: [{
        title: String,
        desc: String,
        icon: String
    }],
    process: [{
        title: String,
        desc: String
    }],
    impact: [String],
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
