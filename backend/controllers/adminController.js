const Admin = require('../models/Admin');
const ChatConfig = require('../models/ChatConfig');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    console.log('Login attempt received:', req.body);
    const { email, password } = req.body;

    // Professional check for Prime Impact Admin
    if (email?.trim() === 'admin@primeimpact.in' && password === 'Prime@2026') {
        console.log('Login successful for:', email);
        const token = jwt.sign({ id: 'admin_prime_id' }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.json({
            _id: 'admin_master_id',
            name: 'Master Admin',
            email: email,
            token: token,
        });
    }

    res.status(401).json({ message: 'Invalid email or password' });
};

// @desc    Get Chatbot Config
// @route   GET /api/admin/chat-config
// @access  Public (for frontend)
exports.getChatConfig = async (req, res) => {
    try {
        let config = await ChatConfig.findOne();
        if (!config) {
            // Create default config if not exists
            config = await ChatConfig.create({});
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chatbot config', error: error.message });
    }
};

// @desc    Update Chatbot Config
// @route   POST /api/admin/chat-config
// @access  Private/Admin
exports.updateChatConfig = async (req, res) => {
    try {
        const { greetingMessage, voiceMessage, enabled, rules } = req.body;
        let config = await ChatConfig.findOne();
        
        if (config) {
            config.greetingMessage = greetingMessage;
            config.voiceMessage = voiceMessage;
            config.enabled = enabled;
            config.rules = rules;
            await config.save();
        } else {
            config = await ChatConfig.create({
                greetingMessage,
                voiceMessage,
                enabled,
                rules
            });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error updating chatbot config', error: error.message });
    }
};
