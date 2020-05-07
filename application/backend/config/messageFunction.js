const UUIDV4 = require('uuid/v4')
//createMessage function
const createMessage = ({ message = "", sender = "" } = { }) => ({
    id: UUIDV4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
})

//create Chat
//messages {Array.Message}
//users {Array.String}
//  {object}
        // message {Array.Message}
        // name {String}
        // users {Array.String}
const createChat = ({ messages = [], name = "Public", users = [] } = {}) => ({
    id: UUIDV4(),
    name,
    messages,
    users,
    typingUsers: [],
})

//get time with date object
const getTime = (date) => {
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage, 
    createChat
}