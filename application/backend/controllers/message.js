const models = require('../models');

const { Message } = models;

//2 parametter pass in with Id and message content
const create = (messageId, messageContent, sender) => {
    const newMessage = {
        messageId,
        messageContent,
        sender,
    }
    Message.create(newMessage)
    .then(data => {
        return data;
    })
}

// exports.create = function(messageId, messageContent, sender) {
//     const newMessage = {
//         messageId,
//         messageContent,
//         sender,
//     }    
// }
exports.create = create;