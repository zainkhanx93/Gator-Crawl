import React from 'react';
import { connect } from 'react-redux';
import MainNavBar from '../Components/Navigation/MainNavBar';

class Messages extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <MainNavBar history={history} />
        <br />
        <p style={{ textAlign: 'center' }}>No new messages</p>
      </div>
    );
  }
}

export default Messages;
