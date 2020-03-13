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
    // associations can be defined here
    Product.hasMany(models.Category, {
      foreignKey: 'id',
      as: 'category',
    });
  };
  return Product;
};
