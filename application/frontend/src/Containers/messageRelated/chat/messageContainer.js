import React, { Component } from 'react';
import SideBar from '../sidebar/SideBar'
import { PUBLIC_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, 
				TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED,
				NEW_CHAT_USER } from '../messageEvent'
import ChatHeading from './ChatHeading'
import Messages from '../message/Message'
import MessageInput from '../message/MessageInput'
import { values, difference, differenceBy } from 'lodash'

export default class ChatContainer extends Component {
	constructor(props) {
	  super(props);	
	
	  this.state = {
		  chats:[],
		  users:[{ id: 1, email: "Huy"}, {id: 2, email: "two" }],
	  	activeChat:null
	  }
	}

	componentDidMount() {
		const { socket } = this.props
		this.initSocket(socket)
	}
	
	componentWillUnmount() {
		const { socket } = this.props
		socket.off(PRIVATE_MESSAGE)
		socket.off(USER_CONNECTED)
		socket.off(USER_DISCONNECTED)
		socket.off(NEW_CHAT_USER)
	}
	
	initSocket(socket){
		socket.emit(PUBLIC_CHAT, this.resetChat)
		socket.on(PRIVATE_MESSAGE, this.addChat)
		socket.on('connect', ()=>{
			socket.emit(PUBLIC_CHAT, this.resetChat)
		})
		socket.on(USER_CONNECTED, (users)=>{
			console.log("Connection establish here: ");
			console.log(users)
			//console.log("connected: " + users + "value: " + values(users));
			this.setState({ users: values(users) })
		})
		socket.on(USER_DISCONNECTED, (users)=>{
			const removedUsers = differenceBy( this.state.users, values(users), 'id')
			this.removeUsersFromChat(removedUsers)
			this.setState({ users: values(users) })			
		})
		socket.on(NEW_CHAT_USER, this.addUserToChat)
	}

	sendOpenPrivateMessage = (reciever) => {
		const { socket, user } = this.props
		const { activeChat } = this.state
		socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.email, activeChat})

	}
	addUserToChat = ({ chatId, newUser }) => {
		const { chats } = this.state
		const newChats = chats.map( chat => {
			if(chat.id === chatId){
				return Object.assign({}, chat, { users: [ ...chat.users, newUser ] })
			}
			return chat
		})
		this.setState({ chats:newChats })
	}
	removeUsersFromChat = removedUsers => {
		const { chats } = this.state
		const newChats = chats.map( chat => {
			let newUsers = difference( chat.users, removedUsers.map( u => u.email ) )
				return Object.assign({}, chat, { users: newUsers })
		})
		this.setState({ chats: newChats })
	}

	/*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
	resetChat = (chat)=>{
		return this.addChat(chat, true)
	}

	/*
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*	
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
	*/
	addChat = (chat, reset = false)=>{
		const { socket } = this.props
		const { chats } = this.state

		const newChats = reset ? [chat] : [...chats, chat]
		this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, this.updateTypingInChat(chat.id))
		socket.on(messageEvent, this.addMessageToChat(chat.id))
	}

	/*
	* 	Returns a function that will 
	*	adds message to chat with the chatId passed in. 
	*
	* 	@param chatId {number}
	*/
	addMessageToChat = (chatId)=>{
		return message => {
			const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({chats:newChats})
		}
	}

	/*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	updateTypingInChat = (chatId) =>{
		//console.log("Current Typing email: " + this.props.user.email)
		return ({isTyping, user})=>{
			if(user !== this.props.user.email){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}

	/*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
	sendMessage = (chatId, message)=>{
		const { socket } = this.props
		socket.emit(MESSAGE_SENT, {chatId, message} )
	}

	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	sendTyping = (chatId, isTyping)=>{
		const { socket } = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}

	setActiveChat = (activeChat)=>{
		this.setState({activeChat})
	}
	render() {
		const { user, logout } = this.props
		const { chats, activeChat, users } = this.state
		// console.log("ALL users in message Container is: ");
		// users.map((currentUser) => {
		// 	console.log("user id: " + currentUser.id)
		// 	console.log("user email " + currentUser.email)
		// })

		return (
			<div className="container">
				<SideBar
					logout={logout}
					chats={chats}
					user={user}
					users={users}
					activeChat={activeChat}
					setActiveChat={this.setActiveChat}
					onSendPrivateMessage={this.sendOpenPrivateMessage}
					/>
				<div className="chat-room-container">
					{
						activeChat !== null ? (

							<div className="chat-room">
								<ChatHeading name={activeChat.name} />
								<Messages 
									messages={activeChat.messages}
									user={user}
									typingUsers={activeChat.typingUsers}
									/>
								<MessageInput 
									sendMessage={
										(message)=>{
											this.sendMessage(activeChat.id, message)
										}
									}
									sendTyping={
										(isTyping)=>{
											this.sendTyping(activeChat.id, isTyping)
										}
									}
									/>

							</div>
						):
						<div className="chat-room choose">
							<h3>Choose a chat!</h3>
						</div>
					}
				</div>

			</div>
		);
	}
}
