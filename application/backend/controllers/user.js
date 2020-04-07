const models = require('../models');

const { User } = models;
//Using bcrypt to hash password
const bcrypt = require('bcryptjs');
//JWT
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

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
                //res.send(data); if we remove comment of this line. ERR_HTTP_HEADERS_SENT err will occurs
                //Build payload for JWT
                let payload = {
                  id: data._id,
                  email: data.email,
                }
                /*
                                res.status(200).json({
                                  token: JWT.sign(payload, JWT_SECRET, {
                                    expiresIn: parseInt(expDate.getDate())
                                  }),
                                  user: data
                                })
                */

                const jwtToken = JWT.sign({
                  sub: payload,
                  iat: new Date().getTime(), //current
                  exp: new Date().setTime(new Date().getTime() + 1) //expirate
                }, JWT_SECRET);

                console.log(jwtToken);

                //cookie implement
                res.cookie('access_token', jwtToken, {
                  httpOnly: true
                });

                res.status(200).json({
                  token: jwtToken,
                  user: data
                })

                //res.redirect('/api/users/login');
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

//Handle Sign In function with JWT - Public
//route /api/users/login => Log In user and return JWT token
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }

  User.findOne({ where: { email: req.body.email } })
    .then(function (user) {
      if (!user) {
        return res.status(400).send({
          msg: "Email did not register yet!"
        })
      }
      //check password, isMatch is a boolean - True if both match
      //user.password is password from database
      //password is password from post request
      isMatch = bcrypt.compareSync(user.password, password)
      if (!isMatch)
        return res.status(400).send({
          msg: "Password was incorrect!"
        })
      //Successful log in
      //Build payload for JWT
      const today = new Date();
      const expDate = new Date(today);
      expDate.setDate(today.getDate() + 1) //one day ahead to expirate
      //payload hold all datas
      let payload = {
        id: user._id,
        email: user.email,
      }
      res.status(200).json({
        token: JWT.sign(payload, JWT_SECRET, {
          expiresIn: parseInt(expDate.getDate())
        }),
        user: user
      })
    })
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
