'use strict';
// private chat
// senderId + receiverID - socketID
// messages JSON object keep track of all message from both sides
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
    {
        name: DataTypes.STRING,
        senderId: DataTypes.STRING,
        receiverId: DataTypes.STRING,
        //messages: DataTypes.JSON,
    },
    {}
  );
  Conversation.associate = function(models) {
    Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        as: 'message',
        onDelete: 'CASCADE',
      });
  };
  return Conversation;
};