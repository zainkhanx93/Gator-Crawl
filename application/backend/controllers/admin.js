const { Op } = require('sequelize');

const models = require('../models');

const { Sale, Product } = models;

exports.approveProduct = (req, res) => {
  const { productId } = req.params;
  const { admin } = req.user;

  if (admin !== true) {
    return res
      .status(400)
      .send({ message: 'You do not have permission to do this action' });
  }

  Product.update(
    { approved: true },
    {
      where: {
        id: productId,
      },
    }
  ).then(data => {
    if (!data) {
      return res.status(400).send({ message: 'Could not update product' });
    }
    if (data[0] === 1) {
      res.send({ message: 'Product approved successfully' });
    } else {
      res.status(400).send({ message: 'Could not update product' });
    }
  });
};

exports.getNonApprovedProducts = (req, res) => {
  const { admin } = req.user;
  if (admin !== true) {
    return res
      .status(400)
      .send({ message: 'You do not have permission to do this action' });
  }

  Product.findAll({
    where: {
      approved: false,
    },
  })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        error: err,
        message: 'Something went wrong trying to get products',
      });
    });
};

exports.approveSale = (req, res) => {
  const { saleId } = req.params;
  const { admin } = req.user;

  if (admin !== true) {
    return res
      .status(400)
      .send({ message: 'You do not have permission to do this action' });
  }

  Sale.update(
    { approved: true },
    {
      where: {
        id: saleId,
      },
    }
  ).then(data => {
    if (!data) {
      return res.status(400).send({ message: 'Could not update sale' });
    }
    if (data[0] === 1) {
      res.send({ message: 'Sale approved successfully' });
    } else {
      res.status(400).send({ message: 'Could not update sale' });
    }
  });
};

exports.getNonApprovedSales = (req, res) => {
  const { admin } = req.user;
  if (admin !== true) {
    return res
      .status(400)
      .send({ message: 'You do not have permission to do this action' });
  }

  Sale.findAll({
    where: {
      approved: false,
    },
  })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        error: err,
        message: 'Something went wrong trying to get sales',
      });
    });
};
