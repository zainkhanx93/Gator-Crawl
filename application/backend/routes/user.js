const express = require('express');
const users = require('../controllers/user.js');

const router = express.Router();

router.post('/', users.create);

router.get('/', users.findAll);

router.delete('/:id', users.delete);

module.exports = router;
