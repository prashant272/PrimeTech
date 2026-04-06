const Admin = require('../models/Admin');
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
