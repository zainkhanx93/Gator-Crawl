module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'fcruz2@mail.sfsu.edu',
          firstName: 'Niko',
          lastName: 'Cruz',
          major: 'Computer Science',
          username: 'Niko',
          password: 'password',
          profilePhoto: 'https://dummyimage.com/24x24/ad93ad/ffffff',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
