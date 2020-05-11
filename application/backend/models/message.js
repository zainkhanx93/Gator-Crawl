'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      author: DataTypes.STRING,
      messageContent: DataTypes.TEXT,
      roomName: DataTypes.STRING,
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Conversation, {
      // foreignKey: 'conversationID',
      // as: 'message',
      // onDelete: 'CASCADE',
    });
  };
  return Message;
};
