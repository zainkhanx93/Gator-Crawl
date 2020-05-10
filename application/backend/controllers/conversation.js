const models = require('../models');
const { Op } = require('sequelize');

const { Conversation, Message } = models;

//find or create - first find if not found then create message
const findOrCreateConversation = (receiverId, senderId) => {
    Conversation.findAll({
        where: {
          receiverId: {
            [Op.or]: [senderId, receiverId]
          },
          senderId: {
            [Op.or]: [senderId, receiverId]
          },
          
        },
        include: [{
            model: Message, // messageContent
            as: 'message' // specifies how we want to be able to access our joined rows on the returned data
          }],
        order: [[ {
            model: Message, // messageContent
            as: 'message' // specifies how we want to be able to access our joined rows on the returned data
          }, 'createdAt', 'DESC' ]]
      })
        .then(conversation => {
          if(conversation) {
            return conversation;
          } else {
            return Conversation.create({
              senderId: senderId,
              receiverId: receiverId, 
              //messages: [],
            }, {
              include: [{
                model: Message,
                as: 'message' // specifies how we want to be able to access our joined rows on the returned data
              }],
              order: [[ {
                model: Message, // messageContent
                as: 'message' // specifies how we want to be able to access our joined rows on the returned data
              }, 'createdAt', 'DESC' ]]
            });
          }
        });
}

exports.findOrCreateConversation = findOrCreateConversation;