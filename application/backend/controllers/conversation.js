const models = require('../models');
const { Op } = require('sequelize');

const { Conversation, Message } = models;

const create = (name, receiverId, senderId) => {
  const newConversation = {
    name,
    receiverId,
    senderId,
  }
  Conversation.create(newConversation)
    .then(data => { return data })
}

// const addMessageToDB = (name, message) => {
//   Conversation.findOne({
//     where: {
//       name,
//     }
//   })
//   .then(conversation => {
//     if (conversation) {
//       conversation.messages = message;
//     }
//   })
// }

//find or create - first find if not found then create message
const findOrCreateConversation = (receiverId, senderId) => {
    Conversation.findOne({
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
            console.log(conversation)
            return conversation;
          } else {
            return Conversation.create({
              name: `${receiverId} & ${senderId}`,
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
exports.create = create;