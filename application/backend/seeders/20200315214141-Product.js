module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          photo:
            'https://csc648-team01.s3.us-east-2.amazonaws.com/open_sign.jpg',
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
          photo:
            'https://csc648-team01.s3.us-east-2.amazonaws.com/open_sign.jpg',
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
          photo:
            'https://csc648-team01.s3.us-east-2.amazonaws.com/open_sign.jpg',
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
          photo:
            'https://csc648-team01.s3.us-east-2.amazonaws.com/open_sign.jpg',
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
