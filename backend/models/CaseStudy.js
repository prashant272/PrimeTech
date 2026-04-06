const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    text: { type: String, required: true },
    color: { type: String, default: '#3b82f6' },
    bold: { type: Boolean, default: true }
});

const caseStudySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    fullStory: { type: String, required: true },
    challenge: { type: String, required: true },
    approach: { type: String, required: true },
    image: { type: String, required: true },
    results: [resultSchema],
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
