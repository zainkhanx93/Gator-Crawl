module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    FirstName: {
      type: Sequelize.STRING,
    },
    LastName: {
      type: Sequelize.STRING,
    },
    Major: {
      type: Sequelize.STRING,
    },
    Username: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    ProfilePhoto: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
