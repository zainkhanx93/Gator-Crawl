'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategories = sequelize.define('ProductCategories', {
    name: DataTypes.STRING
  }, {});
  ProductCategories.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategories;
};