const express = require("express");
const router = express.Router();
console.log('Admin routes loading...');
const { loginAdmin, getChatConfig, updateChatConfig } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/chat-config", getChatConfig);
router.post("/chat-config", protect, updateChatConfig);

module.exports = router;
