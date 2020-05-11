const models = require('../models');
const { Op } = require('sequelize');

const { Conversation, Message } = models;

const create = (name, receiverId, senderId) => {
  return Conversation.findOrCreate({
    where: {
      name,
      receiverId,
      senderId,
    }}).then(data => { return data })
}

// function upsert(values, condition) {
//   return Conversation
//     .findOne({ where: condition })
//     .then(function (obj) {
//       // update
//       if (obj)
//         return obj.update(values);
//       // insert
//       return Conversation.create(values);
//     })
// }

// add message to databse
// parameter message is JSON object
// parameter name is room name
const addMessageToDB = (name, message) => {

  // let newMessage = [];
  // newMessage.push(message);
  // console.log("New MEssage: ");
  // console.log(newMessage);

  return Conversation.update({
    messages: newMessage,
  }, {
    where: {
      name,
    }
  })

  // data.update({
  //     messageContent: "data.id",
  //     author: "by me",
  //     roomName: "nowhere",
  // }, {where: {
  //     id: data.id,
  //  }});

  //   upsert({ messages: message,}, { name }).then(function(result){
  //     console.log(result);
  // });
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
      // as: 'id' // specifies how we want to be able to access our joined rows on the returned data
    }],
    order: [[{
      model: Message, // messageContent
      // as: 'id' // specifies how we want to be able to access our joined rows on the returned data
    }, 'createdAt', 'DESC']]
  })
    .then(conversation => {
      return conversation;

    });
}

const findAndShow = (name) => {
  Conversation.findAll({
    where: {
      name,
    },
    include: [{
      model: Message, // messageContent
      // as: 'id' // specifies how we want to be able to access our joined rows on the returned data
    }],
    order: [[{
      model: Message, // messageContent
      // as: 'id' // specifies how we want to be able to access our joined rows on the returned data
    }, 'createdAt', 'DESC']]
  })
    .then(conversation => {
      console.log("<><>CONSERVATION FIND HERE<><>")
      console.log(conversation);
    });
}

exports.findOrCreateConversation = findOrCreateConversation;
exports.create = create;
exports.addMessageToDB = addMessageToDB;
exports.findAndShow = findAndShow;