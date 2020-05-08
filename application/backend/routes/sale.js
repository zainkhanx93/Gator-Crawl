const express = require('express');
const sales = require('../controllers/sale.js');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// creates sale
router.post('/', sales.create);

// gets all sales for specified userID
router.get('/:userId', sales.findUserSales);

// gets all sales for own user
router.get('/', sales.findOwnSales);

module.exports = router;
