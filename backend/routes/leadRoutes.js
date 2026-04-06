const express = require('express');
const router = express.Router();
const { createLead, getLeads } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads); // In a real app, this would have auth middleware

module.exports = router;
