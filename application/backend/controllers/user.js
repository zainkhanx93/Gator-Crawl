const models = require('../models');

const { User } = models;
// Using bcrypt to hash password
const bcrypt = require('bcryptjs');
// JWT
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Create and Save a new user
// Since we login in with 2 fields email and password
exports.create = (req, res) => {
  const {
    email,
    password,
    major,
    username,
    admin,
    profilePhoto,
    firstName,
    lastName,
  } = req.body;
  if (!password || !email) {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }
  // respond with jwt with id as payload (maybe later)
  User.findOne({ where: { email: req.body.email } }).then(function(user) {
    if (user) {
      return res.status(400).send({
        msg: 'User already registers',
      });
    }
    // const hashPassword = await bcrypt.hash(req.body.password, 10); raise error
    const newUser = {
      email,
      password,
      major,
      username,
      admin,
      profilePhoto,
      firstName,
      lastName,
    };
    // bcrypt hash password
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        console.log('saltError => ', saltError);
        throw saltError;
      }
      bcrypt.hash(newUser.password, salt, (hashError, hashPassword) => {
        if (hashError) {
          console.log('hashError => ', hashError);
          throw hashError;
        }
        newUser.password = hashPassword;
        User.create(newUser)
          .then(data => {
            const payload = {
              id: data.id,
              admin: data.admin,
            };
            console.log('payload => ', payload);
            const jwtToken = JWT.sign(payload, JWT_SECRET, {
              expiresIn: '2 days',
            });

            // cookie implement
            res.cookie('access_token', jwtToken, {
              httpOnly: true,
            });

            res.status(200).json({
              token: jwtToken,
            });
          })
          .catch(err => {
            return res
              .status(500)
              .send({ error: err, message: 'error creating user' });
          });
      });
    });
  });
};

// Handle Sign In function with JWT - Public
// route /api/users/login => Log In user and return JWT token
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.user.dataValues);
  if (!password || !email) {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }

  User.findOne({ where: { email: req.body.email } }).then(function(user) {
    if (!user) {
      return res.status(400).send({
        msg: 'Email did not register yet!',
      });
    }
    // check password, isMatch is a boolean - True if both match
    // user.password is password from database
    // password is password from post request
    bcrypt.compare(password, user.password, function(err, result) {
      if (result == true) {
        // Successful log in
        // Build payload for JWT
        const today = new Date();
        const expDate = new Date(today);
        expDate.setDate(today.getDate() + 1); // one day ahead to expirate
        // payload hold all datas
        const payload = {
          id: user.id,
          admin: user.admin,
        };
        res.status(200).json({
          token: JWT.sign(payload, JWT_SECRET, {
            expiresIn: '2 days',
          }),
        });
      } else {
        return res.status(400).send({
          msg: 'Password was incorrect!',
        });
      }
    });
  });
};

// Find all users
exports.findById = (req, res) => {
  const { id } = req.params;
  console.log('hello world');

  User.findAll({
    where: {
      id: id,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: 'Error occurred while retrieving users',
      });
    });
};

// Delete with specified id
exports.delete = (req, res) => {
  const { id } = req.params;
  User.destroy({
    where: { id },
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: `User delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: `Could not delete user with id ${id}` });
    });
};

// Find User by email
exports.findByEmail = (req, res) => {
  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: 'Error occurred while retrieving users',
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        error: err.message,
        message: 'Error occurred while retrieving users',
      });
    });
};
