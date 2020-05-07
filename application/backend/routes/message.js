const express = require('express');
const message = require('../controllers/message.js');

const router = express.Router();

// /api/message
router.get('/', message);

module.exports = router;