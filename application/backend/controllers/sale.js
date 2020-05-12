const { Op } = require('sequelize');
const models = require('../models');

const { Sale } = models;

exports.create = (req, res) => {
  const sale = req.body;

  Sale.create(sale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res
        .status(500)
        .send({ error: err.message, message: 'Error creating sale' });
    });
};

// find all completed sales for entered user
exports.findUserSales = (req, res) => {
  const { userId } = req.params;
  Sale.findAll({
    where: {
      [Op.and]: [
        {
          sellerId: userId,
        },
        { approved: true },
      ],
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res
        .status(500)
        .send({ error: err.message, message: 'Error finding sales' });
    });
};

exports.findOwnSales = (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;

  if (id !== userId) {
    return res
      .status(400)
      .send({ message: 'You do not have access to this data' });
  }

  Sale.findAll({
    where: {
      sellerId: userId,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err.message,
        message: 'Error occurred while retireving sales',
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.id;

  Sale.destroy({
    where: {
      [Op.and]: [{ id: id }],
    },
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Product was deleted successfully!',
        });
      } else {
        res.send({
          message: `Could not delete product`,
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: `Could not delete user with id ${id}` });
    });
};
