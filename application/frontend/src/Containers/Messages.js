import React from 'react';
import { connect } from 'react-redux';
import MainNavBar from '../Components/Navigation/MainNavBar';

import ChatContainer from './chat/messageContainer'
//URL for socket to connect to local for now or aws ip address

class Messages extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  //
  render() {
    const { history } = this.props;
    const { socket, user } = this.props;
    console.log(user);
    return (
      <div>
        <MainNavBar history={history} />
        <br />
        <p style={{ textAlign: 'center' }}>No new messages</p>
        <ChatContainer socket={socket} user={user} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.messageReducer.socket,
    user: state.messageReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
