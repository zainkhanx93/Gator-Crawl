const { Op } = require('sequelize');
const models = require('../models');

const { Product } = models;

// create and save new product
exports.create = (req, res) => {
  const product = req.body;

  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res
        .status(500)
        .send({ error: err.message, message: 'error creating product' });
    });
};

exports.findAll = (req, res) => {
  Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err.message,
        message: 'Error occurred while retrieving users',
      });
    });
};

exports.findWithFilter = (req, res) => {
  const { categoryId } = req.params;
  Product.findAll({
    where: {
      categoryId: categoryId,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err.message,
        message: 'error occurred while retrieving products',
      });
    });
};

exports.findWithQuery = (req, res) => {
  const { query, categoryId } = req.params;

  if (categoryId) {
    Product.findAll({
      where: {
        [Op.and]: [
          {
            productName: {
              [Op.substring]: query,
            },
            categoryId: categoryId,
          },
        ],
      },
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error: err.message,
          message: 'Error occurred while retrieving products',
        });
      });
  } else {
    Product.findAll({
      where: {
        productName: {
          [Op.substring]: query,
        },
      },
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error: err.message,
          message: 'Error occurred while retrieving products',
        });
      });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Product.destroy({
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
