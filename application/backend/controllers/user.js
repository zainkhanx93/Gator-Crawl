const models = require('../models');

const { User } = models;
//Using bcrypt to hash password
const bcrypt = require('bcryptjs');

// Create and Save a new user
//Since we login in with 2 fields email and password
exports.create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!password || !email) {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }
  // respond with jwt with id as payload (maybe later)
  User.findOne({ where: { email: req.body.email } })
    .then(function (user) {
      if (user) {
        return res.status(400).send({
          msg: "User already registers"
        })
      } else {
        //const hashPassword = await bcrypt.hash(req.body.password, 10); raise error
        const newUser = {
          email: req.body.email,
          password: req.body.password,
        }
        //bcrypt hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hashPassword) => {
            if (err) throw err;
            newUser.password = hashPassword;
            User.create(newUser)
            .then(data => {
              //text
              res.send(data);
              //Json object
              //res.json(data);
              res.redirect('/api/users/login');
            })
            .catch(err => {
              return res
                .status(500)
                .send({ error: err, message: 'error creating user' });
            });
          })
        })
      }
      

    })
  }

  exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).send({ message: 'Content cannot be empty' });
    }

    User.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        return res
          .status(500)
          .send({ error: err, message: 'error creating user' });
      });
  };

  // Find all users
  exports.findAll = (req, res) => {
    User.findAll()
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
