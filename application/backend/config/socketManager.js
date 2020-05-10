//grab io var from server.js
const io = require('../server.js').io
const { PUBLIC_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
    TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
    NEW_CHAT_USER } = require('../../frontend/src/Containers/messageRelated/messageEvent');
const { createMessage, createChat } = require('../config/messageFunction')

const addMessageToDB = require('../controllers/message.js');
const conversation = require('../controllers/conversation.js');

let connectedUser = { };
let communityChat = createChat({ isCommunity:true });
//export
// module.exports = function(io) {
//     io.sockets.on('connection', function(socket){
//         console.log("socket id: " + socket.id);
//     })
// } 
module.exports = function(socket) {
    // console.log("Socket id is: " + socket.id);

	let sendMessageToChatFromUser;
	let sendTypingFromUser;
    //User connected event
    //user object will be added to connected user list
    socket.on(USER_CONNECTED, (user) => {
		user.socketId = socket.id		
		//console.log("user.socketID = " + user.socketId);
        connectedUser = addUser(connectedUser, user)
        //store user to socket.user so we can use it anywhere with socket
        socket.user = user;

		// console.log("New connection is: " + socket.user.email)
		// console.log("connectedUser is: " + connectedUser)
		sendMessageToChatFromUser = sendMessageToChat(user.email)
		console.log(sendMessageToChatFromUser);
		const { chatid, message, sender } = sendMessageToChatFromUser;
		//add message to db
		//addMessageToDB.create(chatid, message, user.email);
		console.log(chatid)
		console.log(message)
		console.log(sender);
		// console.log("user.email: " + user.email);
        sendTypingFromUser = sendTypingToChat(user.email)
        
        //broadcast to all sockets connected
        io.emit(USER_CONNECTED, connectedUser);
		console.log(connectedUser);
		
    })

    //User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUser = removeUser(connectedUser, socket.user.email)

			io.emit(USER_DISCONNECTED, connectedUser)
			//console.log("Disconnect", connectedUsers);
		}
	})

    //Get Public Chat
	socket.on(PUBLIC_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message);
		//console.log(chatId + " " + message);
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

    //Get Private Chat
	socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
		// console.log("sender info: " + {sender});
		// console.log("receiver info: "+ {receiver});
		if(reciever in connectedUser){
			const recieverSocket = connectedUser[reciever].socketId
			if(activeChat === null || activeChat.id === communityChat.id){
				const newChat = createChat({ name:`Private Room of ${reciever} & ${sender}`, users:[reciever, sender] })
				console.log(newChat);
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
				socket.emit(PRIVATE_MESSAGE, newChat);
				//add private chat to db
				conversation.findOrCreateConversation(reciever, sender);
			}else{
				if(!(reciever in activeChat.users)){
					activeChat.users
										.filter( user => user in connectedUser)
										.map( user => connectedUser[user] )
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