const express = require('express');
const products = require('../controllers/product.js');

const router = express.Router();

router.post('/', products.create);

// Get all products
router.get('/all', products.findAll);

router.get('/all/:categoryId', products.findWithFilter);

// Get product with specific id
// router.get('/:id', products.findById);

// Get all products by search term
router.get('/:query', products.findWithQuery);

router.get('/:query/:categoryId', products.findWithQuery);

router.delete('/:id', products.delete);

module.exports = router;
