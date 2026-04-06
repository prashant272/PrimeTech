const mongoose = require('mongoose');

const visaPricingSchema = new mongoose.Schema({
    countrySlug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    visaTypes: [{
        type: { type: String, required: true },
        fee: { type: String, required: true }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('VisaPricing', visaPricingSchema);
