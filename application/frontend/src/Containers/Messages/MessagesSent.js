import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MainNavBar from '../../Components/Navigation/MainNavBar';

import './Messages.css';

const messages = [
  {
    subject: 'Test 1',
    sender: 'Message Sender 1',
    reciever: 'George Freedland',
    message: 'Hey i want to buy your nikes'
  },
  {
    subject: 'Test 2',
    sender: 'Message Sender 2',
    reciever: 'George Freedland',
    message: 'Hey i want to buy your nikes'
  },
  {
    subject: 'Test 3',
    sender: 'Message Sender 3',
    reciever: 'George Freedland',
    message: 'Hey i want to buy your nikes'
  },
  {
    subject: 'Test 4',
    sender: 'Message Sender 4',
    reciever: 'George Freedland',
    message: 'Hey i want to buy your nikes'
  },
  {
    subject: 'Test 5',
    sender: 'Message Sender 5',
    reciever: 'George Freedland',
    message: 'Hey i want to buy your nikes'
  }
];

class MessagesSent extends React.Component {
  render() {
    const { history } = this.props;

    const messagesNav = (
      <nav className="messages-navbar-items">
        <Link to="/messages" className="messages-navbar-item">
          <p>Inbox</p>
        </Link>
        <Link to="/messages/sent" classNames="messages-navbar-item">
          <p>Sent</p>
        </Link>
      </nav>
    );

    return (
      <>
        <MainNavBar history={history} />
        <div className="userwindow">
          <div className="leftside">{messagesNav}</div>
          <div className="rightside">
            {messages.map((value) => (
              <div className="message">
                <div className="message-subject">{value.subject}</div>
                <div className="message-body">
                  <div className="message-tagline">
                    <span>to: </span>
                    <span className="message-sender">{value.sender}</span>
                  </div>
                  <p className="message-text">{value.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default MessagesSent;
