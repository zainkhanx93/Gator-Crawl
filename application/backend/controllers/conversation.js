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

function upsert(values, condition) {
  return Conversation
      .findOne({ where: condition })
      .then(function(obj) {
          // update
          if(obj)
              return obj.update(values);
          // insert
          return Conversation.create(values);
      })
}

// add message to databse
const addMessageToDB = (name, message) => {
  // Conversation.findOne({
  //   where: {
  //     name,
  //   }
  // })
  //   .then(conversation => {
  //     messages: message;
  //     console.log(conversation);
  //     conversation.messages = message;
  //     console.log("From conversation controler :");
  //     console.log(conversation.messages);
  //     // const newConversation = Conversation.create(conversation);
  //     // newConversation.messages = message;
  //     // console.log(newConversation.messages);
  //     // newConversation.save();
  //   })
  // update 1 row in database with update , condition
  upsert({ messages: message,}, { name }).then(function(result){
    console.log(result);
});
}

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
    order: [[{
      model: Message, // messageContent
      as: 'message' // specifies how we want to be able to access our joined rows on the returned data
    }, 'createdAt', 'DESC']]
  })
    .then(conversation => {
      if (conversation) {
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
          order: [[{
            model: Message, // messageContent
            as: 'message' // specifies how we want to be able to access our joined rows on the returned data
          }, 'createdAt', 'DESC']]
        });
      }
    });
}

exports.findOrCreateConversation = findOrCreateConversation;
exports.create = create;
exports.addMessageToDB = addMessageToDB;