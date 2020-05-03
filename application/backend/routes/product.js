const express = require('express');
const products = require('../controllers/product.js');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', products.create);

// Get all products
router.get('/all', products.findAll);

router.get('/all/:categoryId', products.findWithFilter);

// Get product with specific id
// router.get('/:id', products.findById);

router.get('/:userid/all/', requireAuth, products.findAllUserProducts);

// Get all products by search term
router.get('/:query', products.findWithQuery);

router.get('/:query/:categoryId', products.findWithQuery);

router.patch('/:productId', requireAuth, products.updateProduct);

router.delete('/:id', requireAuth, products.delete);

module.exports = router;
