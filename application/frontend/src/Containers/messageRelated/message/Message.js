import React, { Component } from 'react';

export default class Messages extends Component {
	constructor(props) {
	  super(props);
		
		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollDown(){
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	
	render() {
		const { messages, user, typingUsers } = this.props
		console.log("Message function user: " + user.email)
		console.log("Message function: " + messages)
		messages.map((mes)=>{
			console.log(mes.id)
			console.log(mes.sender)
			console.log(mes.message)
		})
		return (
			<div ref='container'
				className="thread-container">
				<div className="thread">
					{
						messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.email && 'right'}`}
								>
									<div className="time">{mes.time}</div>
									<div className="data">
										<div className="message">{mes.message}</div>
										<div className="name">{mes.sender}</div>
									</div>
								</div>

								)
						})
					}
					{
						typingUsers.map((email)=>{
							return (
								<div key={email} className="typing-user">
									{`${email} is typing . . .`}
								</div>
							)
						})
					}
				</div>


			</div>
		);
	}
}
