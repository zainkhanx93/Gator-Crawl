const express = require('express');

const admin = require('../controllers/admin');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

router.patch('/product/:productId', requireAuth, admin.approveProduct);

router.patch('/sale/:saleId', requireAuth, admin.approveSale);

router.get('/sales', requireAuth, admin.getNonApprovedSales);

router.get('/products', requireAuth, admin.getNonApprovedProducts);

module.exports = router;
