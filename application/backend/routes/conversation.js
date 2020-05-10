const express = require('express');
const models = require('../models');
const conversation = require('../controllers/conversation.js');

const router = express.Router();

/* GET users listing. */
// route /conversation/all
router.get("/all", async (req, res, next) => {
    const conversationRoom = await models.conversation.findAll();
    res.send(conversationRoom);
});

// post request to /conversation/chatroom
// if not chatroom available create 1
router.post("/chatroom", async (req, res, next) => {
    const room = req.body.room;
    const chatRooms = await models.conversation.findAll({
        where: { name: room },
    });
    const chatRoom = chatRooms[0];
    if (!chatRoom) {
        await models.conversation.create({ name: room });
    }
    res.send(chatRooms);
});

// get request to /conversation/chatroom/messages/:chatRoomName
// params chatRoomName to get all messages in that chat room
router.get("/chatroom/messages/:chatRoomName", async (req, res, next) => {
    try {
        const chatRoomName = req.params.chatRoomName;
        const chatRooms = await models.conversation.findAll({
            where: {
                name: chatRoomName,
            },
        });
        const chatRoomId = chatRooms[0].id;
        const messages = await models.message.findAll({
            where: {
                conversationId,
            },
        });
        res.send(messages);
    } catch (error) {
        res.send([]);
    }
});

module.exports = router;