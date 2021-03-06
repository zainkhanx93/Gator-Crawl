import React, { Component } from 'react';
import { FaChevronDown, FaSearch} from "react-icons/fa";
import { FcMenu } from "react-icons/fc";
import { MdEject } from "react-icons/md";
// import FAChevronDown from 'react-icons/fa'
// import FAMenu from 'react-icons/fa'
// import FASearch from 'react-icons/fa'
// import MdEject from 'react-icons/lib/md/eject'
import SideBarOption from './SideBarOption'
import { last, get, differenceBy } from 'lodash'
export default class SideBar extends Component{
	static type = {
		USERS:"users",
		CHATS:"chats"
    }
	constructor(props){
		super(props)
		this.state = {
			reciever:"",
			activeSideBar: SideBar.type.CHATS
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendPrivateMessage } = this.props

		onSendPrivateMessage(reciever)
		this.setState({reciever:""})
	}

	addChatForUser = (reciever) => {
		this.props.onSendPrivateMessage(reciever)
		this.setActiveSideBar(SideBar.type.CHATS)
	}
	setActiveSideBar = (type) => {
		this.setState({ activeSideBar:type })
	}
	createChatNameFromUsers = (users, excludedUser = "") => {
		return users.filter(u => u !== excludedUser).join(' & ')
	}

	render(){
		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { reciever, activeSideBar } = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name"> Chat App <FaChevronDown /></div>
						<div className="menu">
							<FcMenu />
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FaSearch /></i>
						<input
							placeholder="Search"
							type="text"
							value={reciever}
							onChange={(e)=>{ this.setState({reciever:e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div className="side-bar-select">
						<div
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.CHATS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.CHATS ? 'active':''}`}>
							<span>Chats</span>
						</div>
						<div
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.USERS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.USERS ? 'active':''}`}>
							<span>Users</span>
						</div>
					</div>
					<div
						className="users"
						ref='users'
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>

						{
						activeSideBar === SideBar.type.CHATS ?
						chats.map((chat)=>{
								return(
								<SideBarOption

									key = {chat.id}
                                    lastMessage = { get(last(chat.messages), 'message', '') }
                                    //name = {chat.name}
									name = { chat.isCommunity ? chat.name : this.createChatNameFromUsers(chat.users, user.email) }
									active = { activeChat.id === chat.id }
									onClick = { ()=>{ this.props.setActiveChat(chat) } }
								/>
							)
						})

						:
							differenceBy(users, [user], 'email').map((user)=>{
								return <SideBarOption
									key = { user.id }
									name = { user.email }
									onClick = { ()=>{ this.addChatForUser(user.email) }  }
								/>
							})
						}
					</div>
					<div className="current-user">
						<span>{user.email}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							<MdEject/>
						</div>
					</div>
			</div>
		);

	}
}
