const db = require('../database');

const User = db.users;

// Create and Save a new user
exports.create = (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }

  const user = {
    username,
    password,
  };

  // respond with jwt with id as payload
  User.create(user)
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
          message: 'Tutorial was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: `Could not delete user with id ${id}` });
    });
};
