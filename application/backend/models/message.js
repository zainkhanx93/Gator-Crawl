'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      conversationId: DataTypes.INTEGER,
      author: DataTypes.STRING,
      messageContent: DataTypes.TEXT,
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      as: 'message',
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
