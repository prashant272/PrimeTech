const Application = require('../models/Application');

// Submit a new application
exports.submitApplication = async (req, res) => {
    console.log('--- NEW APPLICATION ATTEMPT ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    try {
        const { 
            candidateName, email, mobile, jobTitle, message, 
            address, highestQualification, otherQualifications, 
            certifications, workFromOffice 
        } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Resume file is required' });
        }

        const newApplication = new Application({
            candidateName,
            email,
            mobile,
            jobTitle,
            message,
            address,
            highestQualification: typeof highestQualification === 'string' ? JSON.parse(highestQualification) : highestQualification,
            otherQualifications: typeof otherQualifications === 'string' ? JSON.parse(otherQualifications) : otherQualifications,
            certifications,
            workFromOffice: workFromOffice === 'true' || workFromOffice === true,
            resumeUrl: req.file.location
        });

        await newApplication.save();
        res.status(201).json({ success: true, message: 'Application submitted successfully', data: newApplication });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ success: false, message: 'Server error while submitting application' });
    }
};

// Get all applications (Admin only)
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ appliedAt: -1 });
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching applications' });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Interviewed', 'Hired', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, message: `Status updated to ${status}`, data: application });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: 'Server error while updating status' });
    }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByIdAndDelete(id);
        
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting application' });
    }
};
