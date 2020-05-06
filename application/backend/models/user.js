'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      major: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
      foreignKey: 'sellerId',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
