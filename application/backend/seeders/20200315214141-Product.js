module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          photo: 'https://dummyimage.com/400x400/ad93ad/ffffff',
          categoryId: 1,
          description: 'First Product',
          productName: 'Shoes',
          sellerId: 1,
          startDate: new Date(),
          endDate: new Date(),
          bidding: false,
          price: 100.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://dummyimage.com/400x400/ad93ad/ffffff',
          categoryId: 2,
          description: 'Second Product',
          productName: 'Electronics',
          sellerId: 1,
          startDate: new Date(),
          endDate: new Date(),
          bidding: false,
          price: 100.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Products', null, {}),
};
