const express = require('express');
const users = require('../controllers/user.js');
const passport = require('passport');
require('../config/passport')

const passportSignIn = passport.authenticate( 'local', { session: false } ); 
const router = express.Router();

//Register new User
//POST request public add new User to route /api/users/
router.post('/', users.create);

//Log in current User
//Post request to /api/login
router.post('/login', passportSignIn, users.login);

//Show all registered User
//Get request public to route /api/users/
router.get('/', users.findAll);

//Delete User
//Del request private, giving private user's id
router.delete('/:id', users.delete);

//upload profile image
//Put request to route /api/users/image/:id to upload profile image
router.put('/image/:userID', users.uploadImage);


//show profile image
//Get request to route /api/users/image/:id to see profile image
//router.get('/image/:userID', users.showImage);

//Update information of specific user
//put request to route /api/users/update/:id
//Private, giving user's id
router.put('/update/:id', users.userUpdate);
module.exports = router;
