const express = require('express');
const products = require('../controllers/product.js');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', products.create);

// Get all products
router.get('/', products.findAll);

router.get('/all/:categoryId', products.findWithFilter);

// Get product with specific id
router.get('/id/:id', products.findById);

// find all sold products for given user
router.get('/:userid/all/sold', products.findAllSoldProducts);

// find all products with userId
router.get('/:userid/all/', requireAuth, products.findAllUserProducts);

router.get('/:userid/all/public', products.findAllPublicUserProducts);

// Get all products by search term
router.get('/:query', products.findWithQuery);

router.get('/:query/:categoryId', products.findWithQuery);

router.patch('/:productId', requireAuth, products.updateProduct);

router.delete('/:id', requireAuth, products.delete);

module.exports = router;
