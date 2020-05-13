import React from 'react';
import { values, difference, differenceBy } from 'lodash';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import SideBar from '../sidebar/SideBar';
import {
  PUBLIC_CHAT,
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  TYPING,
  PRIVATE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  NEW_CHAT_USER
} from '../messageEvent';
import ChatHeading from './ChatHeading';
import Messages from '../message/Message';
import MessageInput from '../message/MessageInput';
import * as userActions from '../../../Store/Actions/userActions';


class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      users: [],
      activeChat: null
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initUser();
    if (socket) {
      this.initSocket(socket);
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;
    if (socket) {
      socket.off(PRIVATE_MESSAGE);
      socket.off(USER_CONNECTED);
      socket.off(USER_DISCONNECTED);
      socket.off(NEW_CHAT_USER);
    }
  }

  initUser = () => {
    const { setCurrentUser } = this.props;
    const cookie = new Cookies();
    let id;
    const token = cookie.get('token');
    if (token) {
      id = cookie.get('id');
    }
    axios.get(`/api/users/${id}`).then((res) => {
      console.log('res.data => ', res.data);
      setCurrentUser(res.data[0]);
      cookie.set('firstName', res.data[0].firstName);
      cookie.set('lastName', res.data[0].lastName);
      cookie.set('major', res.data[0].major);
    });
  };

  sendOpenPrivateMessage = (reciever) => {
    const { socket, user } = this.props;
    const { activeChat } = this.state;
    socket.emit(PRIVATE_MESSAGE, { reciever, sender: user.email, activeChat });
  }

  addUserToChat = ({ chatId, newUser }) => {
    const { chats } = this.state;
    const newChats = chats.map((chat) => {
      if (chat.id === chatId) {
        return { ...chat, users: [...chat.users, newUser] };
      }
      return chat;
    });
    this.setState({ chats: newChats });
  }

  removeUsersFromChat = (removedUsers) => {
    const { chats } = this.state;
    const newChats = chats.map((chat) => {
      const newUsers = difference(chat.users, removedUsers.map((u) => u.email));
      return { ...chat, users: newUsers };
    });
    this.setState({ chats: newChats });
  }

  /*
  *Reset the chat back to only the chat passed in.
  * @param chat {Chat}
  */
  resetChat = (chat) => {
    return this.addChat(chat, true);
  }

  /*
  *Adds chat to the chat container, if reset is true removes all chats
  *and sets that chat to the main chat.
  *Sets the message and typing socket events for the chat.
  *
  *@param chat {Chat} the chat to be added.
  *@param reset {boolean} if true will set the chat as the only chat.
  */
  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats, activeChat } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats, activeChat: reset ? chat : activeChat });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.id));
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  }

  /*
  * Returns a function that will
  *adds message to chat with the chatId passed in.
  *
  * @param chatId {number}
  */
  addMessageToChat = (chatId) => {
    return (message) => {
      const { chats } = this.state;
      const newChats = chats.map((chat) => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
    };
  };

  /*
  *Updates the typing of chat with id passed in.
  *@param chatId {number}
  */
  updateTypingInChat = (chatId) => {
    const { user } = this.props;
    const { chats } = this.state;

    console.log(`Current Typing email: ${user.email}`);
    return ({ isTyping }) => {
      if (user !== user.email) {
        const newChats = chats.map((chat) => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter((u) => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  }

  /*
  *Adds a message to the specified chat
  *@param chatId {number}  The id of the chat to be added to.
  *@param message {string} The message to be added to the chat.
  */
  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
  }

  /*
  *Sends typing status to server.
  *chatId {number} the id of the chat being typed in.
  *typing {boolean} If the user is typing still or not.
  */
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  }

  setActiveChat = (activeChat) => {
    this.setState({ activeChat });
  }

  initSocket(socket) {
    const { users } = this.state;
    socket.emit(PUBLIC_CHAT, this.resetChat);
    socket.on(PRIVATE_MESSAGE, this.addChat);
    socket.on('connect', () => {
      socket.emit(PUBLIC_CHAT, this.resetChat);
    });
    socket.on(USER_CONNECTED, (users) => {
      this.setState({ users: values(users) });
    });
    socket.on(USER_DISCONNECTED, (users) => {
      const removedUsers = differenceBy(users, values(users), 'id');
      this.removeUsersFromChat(removedUsers);
      this.setState({ users: values(users) });
    });
    socket.on(NEW_CHAT_USER, this.addUserToChat);
  }

  render() {
    const { user, logout } = this.props;
    const { chats, activeChat, users } = this.state;
    console.log(`users in message Container is: ${users}`);
    console.log(user.id);
    console.log(user.email);
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
                <ChatHeading name={activeChat.email} />
                <Messages
                  messages={activeChat.messages}
                  user={user}
                  typingUsers={activeChat.typingUser}
                />
                <MessageInput
                  sendMessage={
                    (message) => {
                      this.sendMessage(activeChat.id, message);
                    }
                  }
                  sendTyping={
                    (isTyping) => {
                      this.sendTyping(activeChat.id, isTyping);
                    }
                  }
                />
              </div>
            ) : (
              <div className="chat-room choose">
                <h3>Choose a chat!</h3>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.currentUser,
    socket: state.messageReducer.socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(userActions.setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
