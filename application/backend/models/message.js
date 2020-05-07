'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      senderUsername: DataTypes.INTEGER,
      receiverUsername: DataTypes.STRING,
      messageContent: DataTypes.STRING,
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'senderUsername',
      as: 'message',
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
