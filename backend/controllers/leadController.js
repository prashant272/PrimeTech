const Lead = require('../models/Lead');

// @desc    Create new lead from chatbot
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res) => {
    try {
        const { name, mobile, email, source, interest } = req.body;

        if (!name || !mobile || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, mobile, email)'
            });
        }

        const lead = await Lead.create({
            name,
            mobile,
            email,
            source: source || 'Chatbot',
            interest: interest || 'General Inquiry'
        });

        res.status(201).json({
            success: true,
            data: lead,
            message: 'Lead captured successfully'
        });
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while capturing lead'
        });
    }
};

// @desc    Get all leads (for admin)
// @route   GET /api/leads
// @access  Private/Admin
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching leads'
        });
    }
};
