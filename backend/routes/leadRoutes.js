const express = require('express');
const router = express.Router();
const { createLead, getLeads, addLeadActivity } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads);
router.patch('/:id/activity', addLeadActivity);

module.exports = router;
