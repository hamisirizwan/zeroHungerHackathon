const express = require('express');
const authenticate = require('../middleware/auth');

const {createChat, getUserChatHistory} = require("../controllers/chatController")
const router = express.Router();

router.use(authenticate);
router.post('/', createChat);
router.get('/', getUserChatHistory);

module.exports = router;
