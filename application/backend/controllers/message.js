const models = require('../models');

const { Message } = models;

const create = (messageContent, author, roomName) => {
    const newMessage = {
        messageContent,
        author,
        roomName,
    }
    Message
        .create(newMessage)
        .then(data => {
            // console.log("DATA ID: ");
            // console.log(data.id);
            // // cannot update foreign_key need to find another way
            // data.update({
            //     messageContent: "data.id",
            //     author: "by me",
            //     roomName: "nowhere",
            // }, {where: {
            //     id: data.id,
            //  }});
            return data;
        })
}

const setConversationID = (messageContent) => {
    return Message.update({
        conversationID: Message.id
    }, {
        where: {
            messageContent,
        }
    }
    )
}
exports.create = create;
exports.setConversationID = setConversationID;