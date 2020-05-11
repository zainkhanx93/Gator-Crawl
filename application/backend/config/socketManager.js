//grab io var from server.js
const io = require('../server.js').io
const { PUBLIC_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
    TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
    NEW_CHAT_USER } = require('../../frontend/src/Containers/messageRelated/messageEvent');
const { createMessage, createChat } = require('../config/messageFunction')

const setMessageToDB = require('../controllers/message.js');
const conversation = require('../controllers/conversation.js');

let connectedUser = { };
let communityChat = createChat({ isCommunity:true });
let privateRoomName = "Public";
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
		sendMessageToChatFromUser = sendMessageToChat(user.email);
		
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
		callback(communityChat);
		privateRoomName = "Public"
	})

	// socket.emit is send event to frontend
	// Listen for event send back from front-end, get from frontend
	socket.on(MESSAGE_SENT, function(data) {
		//console.log(data);
		sendMessageToChatFromUser(data.chatId, data.message);
		//console.log(chatId + " " + message);
		// add message to database
		
		// addMessageToDB.create(data.message, data.sender, data.roomName);
		// conversation.addMessageToDB(data.roomName, data.message);
		// Change message's conversationID(where condition) => cannot update ;
		// addMessageToDB.setConversationID(data.message);
		console.log("Inserted new message... " + data.chatId + " " + data.message + " " + data.sender);
		console.log(privateRoomName + " === " + data.roomName);
		match = privateRoomName.localeCompare(data.roomName);
		console.log(match);
		if (match === 0) {
			// add messages to conversation database
			console.log("<<<I CAN REACH HERE>>>")
			console.log(privateRoomName)
			// let chatLog = [{}];
			// console.log(chatLog);

			setMessageToDB.create(data.message, data.sender, data.roomName);

			// conversation.addMessageToDB(privateRoomName, {messages: data.message});

			console.log("BEGIN FIND MESSAGE: ")
			conversation.findAndShow(privateRoomName);
		}
	 })
	//  	({chatId, message})=>{	
	// }

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

    //Get Private Chat Room
	socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
		// console.log("sender info: " + {sender});
		// console.log("receiver info: "+ {receiver});
		if(reciever in connectedUser){
			const recieverSocket = connectedUser[reciever].socketId
			if(activeChat === null || activeChat.id === communityChat.id){
				const newChat = createChat({ name:`${reciever} & ${sender}`, users:[reciever, sender] })
				console.log(newChat);
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
				// socket.emit(PRIVATE_MESSAGE, newChat);
				//add private chat to db
				console.log("reciever "+reciever);
				console.log("sender "+sender)

				conversation.create(newChat.name, reciever, sender);

				// history = conversation.findOrCreateConversation(reciever, sender);
				// console.log("History: ");
				// console.log(history)
				privateRoomName = newChat.name;
				console.log("new private message: " + newChat.messages);
				socket.emit(PRIVATE_MESSAGE, newChat);
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