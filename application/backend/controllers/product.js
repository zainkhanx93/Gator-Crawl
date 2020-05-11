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

// Find product by id
exports.findById = (req, res) => {
  const { id } = req.params;
  Product.findAll({
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
        message: 'Error occurred while retrieving product',
      });
    });
};

exports.findAllSoldProducts = (req, res) => {
  const { userid } = req.params;

  Product.findAll({
    where: {
      [Op.and]: [
        {
          userId: userid,
        },
        {
          sold: true,
        },
      ],
    },
  });
};

exports.findAllUserProducts = (req, res) => {
  const { id } = req.user;

  Product.findAll({
    where: {
      sellerId: id,
      // approved: true,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err.message,
        message: 'Error occurred while fetching products',
      });
    });
};

// finds all public products
exports.findAll = (req, res) => {
  Product.findAll({
    where: {
      approved: true,
    },
  })
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

// finds all public products with filter
exports.findWithFilter = (req, res) => {
  const { categoryId } = req.params;
  Product.findAll({
    where: {
      [Op.and]: [
        {
          categoryId: categoryId,
        },
        {
          approved: true,
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
        message: 'error occurred while retrieving products',
      });
    });
};

// finds all public products with query
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
            approved: true,
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
        [Op.and]: [
          {
            approved: true,
            productName: {
              [Op.substring]: query,
            },
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
  }
};

exports.updateProduct = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const {
    photo,
    categoryId,
    description,
    productName,
    sellerId,
    startDate,
    endDate,
    bidding,
    price,
  } = req.body;
  Product.update(
    {
      photo,
      categoryId,
      description,
      productName,
      sellerId,
      startDate,
      endDate,
      bidding,
      price,
    },
    {
      where: {
        [Op.and]: [{ id: productId, sellerId: userId }],
      },
    }
  )
    .then(data => {
      if (!data) {
        return res.status(400).send({ message: 'Could not update product' });
      }
      if (data[0] === 1) {
        res.send({ message: 'Product Updated Successfully' });
      } else {
        res.status(400).send({ message: 'Could not update product' });
      }
    })
    .catch(err => {
      return res.status(500).send({
        error: err.message,
        message: 'Something went wrong updating product',
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.id;

  Product.destroy({
    where: {
      [Op.and]: [
        { id: id },
        {
          sellerId: sellerId,
        },
      ],
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
