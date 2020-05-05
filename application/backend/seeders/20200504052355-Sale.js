'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Sales',
      [
        {
          buyerId: 1,
          sellerId: 2,
          productId: 2,
          price: 100.1,
          approved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          buyerId: 1,
          sellerId: 2,
          productId: 4,
          price: 20.0,
          approved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Sales', null, {}),
};
