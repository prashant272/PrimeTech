const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    highestQualification: {
        degree: String,
        branch: String,
        percentage: String
    },
    otherQualifications: [{
        degree: String,
        branch: String,
        percentage: String
    }],
    certifications: {
        type: String,
        trim: true
    },
    workFromOffice: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Interviewed', 'Hired', 'Rejected'],
        default: 'Pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
