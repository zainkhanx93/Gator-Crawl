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
          password:
            '$2a$10$SBNcE/FfDaAX3jAF3pkE3u8AbnWMikJabQNvUXChLZ0IuUjze4.iy',
          profilePhoto: 'https://dummyimage.com/24x24/ad93ad/ffffff',
          createdAt: new Date(),
          updatedAt: new Date(),
          admin: false,
        },
        {
          email: 'admin@mail.sfsu.edu',
          firstName: 'the',
          lastName: 'admin',
          major: 'Computer Science',
          username: 'admin',
          password:
            '$2a$10$6gPJpTnsJQ9LYn29A3sfLO.gqnx9v1W3qXFZnHmQ97LmLysuJ1D1C',
          profilePhoto: 'https://dummyimage.com/24x24/ad93ad/ffffff',
          createdAt: new Date(),
          updatedAt: new Date(),
          admin: true,
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
