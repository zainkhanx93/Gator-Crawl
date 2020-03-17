module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          photo: 'https://dummyimage.com/400x400/ad93ad/ffffff',
          categoryId: 1,
          description: 'First Product',
          productName: 'Nike Air Max',
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
          description: 'this is an old used iClicker',
          productName: 'iClicker',
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
          description: 'Old Tv',
          productName: 'Old Tv',
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
          description: 'Old sfsu shirt from 1975',
          productName: 'Vintage SFSU Shirt',
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
