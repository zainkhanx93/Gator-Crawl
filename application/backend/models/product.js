'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      photo: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      productName: DataTypes.STRING,
      sellerId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      bidding: DataTypes.BOOLEAN,
      price: DataTypes.DECIMAL,
    },
    {}
  );
  Product.associate = function(models) {
    Product.hasMany(models.Category, {
      foreignKey: 'productId',
      as: 'categories',
    });

    Product.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'product',
      onDelete: 'CASCADE',
    });
  };
  return Product;
};
