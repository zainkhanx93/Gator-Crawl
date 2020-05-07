//grab io var from server.js
const io = require('../server.js').io
const { PUBLIC_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
    TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
    NEW_CHAT_USER } = require('../../frontend/src/Containers/messageEvent');
const { createMessage, createChat } = require('../config/messageFunction')

let connectedUser = { }
let communityChat = createChat({ isCommunity:true });
//export
// module.exports = function(io) {
//     io.sockets.on('connection', function(socket){
//         console.log("socket id: " + socket.id);
//     })
// } 
module.exports = function(socket) {
    console.log("Socket id is: " + socket.id);

    //Verify Username event

    //User connected event
    //user object will be added to connected user list
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id
        connectedUser = addUser(connectedUser, user)
        //store user to socket.user so we can use it anywhere with socket
        socket.user = user;

        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendTypingFromUser = sendTypingToChat(user.name)
        
        //broadcast to all sockets connected
        io.emit(USER_CONNECTED, connectedUser);
        console.log(connectedUser);
    })

    //User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUser, socket.user.name)

			io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})

    //Get Public Chat
	socket.on(PUBLIC_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

    ////Get Private Chat
	socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
		if(reciever in connectedUsers){
			const recieverSocket = connectedUsers[reciever].socketId
			if(activeChat === null || activeChat.id === communityChat.id){
				const newChat = createChat({ name:`${reciever}&${sender}`, users:[reciever, sender] })
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
				socket.emit(PRIVATE_MESSAGE, newChat)
			}else{
				if(!(reciever in activeChat.users)){
					activeChat.users
										.filter( user => user in connectedUsers)
										.map( user => connectedUsers[user] )
										.map( user => {
												socket.to(user.socketId).emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever })
										} )
										socket.emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever } )
				}
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat)
			}
		}
	})
}

//addUser function
//add user object to the list of user
//userList object with key and value pairs of users
function addUser( userList, user ){
    let newList = Object.assign([], userList);
    newList[user.email] = user
    return newList
}
//return TYPING-chatID and name of user is typing broadcast to other users
//parameter is user'name or email string
function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

//return a function that take a chat id and message and broadcast to that chat id
//parameter sender's email string
//same as isTying but now we send the messages
function sendMessageToChat(sender){
	return (chatId, message)=>{
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
	}
}

//return newList of current User is removed
//parameter list of connected user object type key-value
//, and username type of string of the one who wish to remove
function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}