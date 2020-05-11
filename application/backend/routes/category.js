const express = require('express');
const categories = require('../controllers/category.js');

const router = express.Router();

router.post('/', categories.create);

router.get('/', categories.findAll);

router.get('/:id', categories.findById);

router.delete('/:id', categories.delete);

module.exports = router;
