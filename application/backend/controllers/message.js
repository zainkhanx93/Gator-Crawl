const models = require('../models');

const { Message } = models;

const create = (conversationId, messageContent, author, roomName) => {
    const newMessage = {
        conversationId,
        messageContent,
        author,
        roomName,
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