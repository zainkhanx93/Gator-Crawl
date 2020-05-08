'use strict';
// Message model
// - will have email field (sender username)- get it from cookies
// - will have email field (receiver username) - get it from the frontend form
// - will have messageContent (string) - stored content to database

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      senderID: DataTypes.INTEGER,
      receiverUsername: DataTypes.STRING,
      messageContent: DataTypes.STRING,
    },
    {}
  );
  Message.associate = function (models) {
    // associations can be defined here

    Message.belongsTo(models.User, {
        foreignKey: 'senderUsername',
        as: 'message',
        onDelete: 'CASCADE',
      });
  };
    return Message;
  };
