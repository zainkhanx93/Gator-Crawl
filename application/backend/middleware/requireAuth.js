const jwt = require('jsonwebtoken');

const models = require('../models');

const { User } = models;

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: 'You must be logged in' });
    }
    console.log('payload => ', payload);
    const { id } = payload;
    const user = await User.findOne({
      where: { id: id },
    });
    req.user = user;
    next();
  });
};
