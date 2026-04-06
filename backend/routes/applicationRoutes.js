const express = require('express');
const router = express.Router();
const { 
    submitApplication, 
    getApplications, 
    updateApplicationStatus, 
    deleteApplication 
} = require('../controllers/applicationController');
const { resumeUpload } = require('../middleware/uploadMiddleware');

// Public route for candidates to apply
router.post('/apply', (req, res, next) => {
    resumeUpload.single('resume')(req, res, (err) => {
        if (err) {
            console.error('Multer Error during application submission:', err);
            return res.status(400).json({ success: false, message: err.message || 'File upload error' });
        }
        next();
    });
}, submitApplication);

// Admin routes
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

module.exports = router;
