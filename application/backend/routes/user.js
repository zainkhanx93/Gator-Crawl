const express = require('express');
const users = require('../controllers/user.js');

const router = express.Router();

//Register new User
//POST request public add new User to route /api/users/
router.post('/', users.create);

//Log in current User
//Post request to /api/login
router.post('/login', users.login);

//Show all registered User
//Get request public to route /api/users/
router.get('/', users.findAll);

//Delete User
//Del request private, giving private user's id
router.delete('/:id', users.delete);

//upload profile image
//Get request to route /api/users/image to upload profile image
//router.post('/image', users.uploadImage);

//show profile image
//Get request to route /api/users/image to see profile image
//router.get('/image', users.showImage);

module.exports = router;
