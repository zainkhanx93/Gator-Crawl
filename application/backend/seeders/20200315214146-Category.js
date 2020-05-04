module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Clothing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Electronics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Collectables & Art',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Home & Garden',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sporting Goods',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Toys & Hobbies',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Other',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    queryInterface.bulkDelete('Categories', null, {}),
};
