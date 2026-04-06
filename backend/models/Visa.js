const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    heroDesc: { type: String, default: '' },
    bgImage: { type: String, default: '' },
    fullDesc: { type: String, default: '' },
    detailedInfo: { type: String, default: '' },
    whyChooseUs: [{ type: String }],
    types: [{
        type: { type: String },
        duration: { type: String },
        fee: { type: String },
        processing: { type: String }
    }],
    documents: [{ type: String }],
    process: [{
        title: { type: String },
        desc: { type: String }
    }],
    features: [{
        title: { type: String },
        desc: { type: String },
        icon: { type: String }
    }],
    active: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visa', visaSchema);
