const express = require('express');
const router = express.Router();
const { chatWithGemini, getChatLogs, logInteraction, trainLog } = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

router.post('/chat', chatWithGemini);
router.get('/logs', protect, getChatLogs);
router.post('/log', logInteraction);
router.post('/train/:id', protect, trainLog);

module.exports = router;
