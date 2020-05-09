import React from 'react';

import gclogo from '../Assets/Images/gclogo.png';
import MainNavBar from '../Components/Navigation/MainNavBar.js';


import './Profile.css';

class Profile extends React.Component {
  render() {
    const { history, currentUser } = this.props;

    const me = (
      <div>
        <p className="Title">My Profile</p>
        <div className="User-Box">
          <div className="Profile-Picture-Window">
            <img className="Profile-picture" src={gclogo} alt="Logo" />
          </div>
          <div className="User-Info">
            <p>
              Name: {currentUser.firstName} {currentUser.lastName}
            </p>
            <p>Email: {currentUser.email}</p>
            <p>Major: {currentUser.major}</p>
          </div>
        </div>
        <br />
        <button className="Button" type="button">
          {' '}
          Edit{' '}
        </button>
      </div>
    );

    return (
      <div>
        <MainNavBar history={history} />
        <div className="userwindow">
          <div className="leftside">
            <ProfileNavBar />
          </div>
          <div className="rightside">{me}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

export default connect(mapStateToProps)(Profile);
