const express = require('express');
const router = express.Router();
const { sendMessage, getAllMessages } = require('../controllers/messageController');

// POST /api/send — Send a message (email or SMS)
router.post('/send', sendMessage);

// GET /api/messages — Get message history
router.get('/messages', getAllMessages);

module.exports = router;
