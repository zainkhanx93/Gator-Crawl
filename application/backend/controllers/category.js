const models = require('../models');

const { Category } = models;

exports.create = (req, res) => {
  const category = req.body;
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res
        .status(500)
        .send({ error: err.message, message: 'error creating category' });
    });
};

// Find product by id
exports.findById = (req, res) => {
  const { id } = req.params;
  Category.findAll({
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
        message: 'Error occurred while retrieving category',
      });
    });
};

exports.findAll = (req, res) => {
  Category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        error: err.message,
        message: 'Error occurred while retrieving categories',
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Category.destroy({ where: { id } })
    .then(num => {
      if (num === 1) {
        res.send({ message: 'Category was deleted' });
      } else {
        res.send({ message: 'Category not found' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: err, message: 'could not delete category' });
    });
};
