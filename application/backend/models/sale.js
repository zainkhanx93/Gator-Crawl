'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      approved: DataTypes.BOOLEAN,
    },
    {}
  );
  Sale.associate = function(models) {
    // associations can be defined here
    Sale.hasOne(models.User, {
      foreignKey: 'buyerId',
    });
    Sale.hasOne(models.User, {
      foreignKey: 'sellerId',
    });
    Sale.hasOne(models.Product, {
      foreignKey: 'productId',
      as: 'products',
    });
  };
  return Sale;
};
