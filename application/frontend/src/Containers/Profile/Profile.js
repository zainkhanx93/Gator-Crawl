import React from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';


import LoginChecker from '../HOC/LoginChecker';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import MainNavBar from '../../Components/Navigation/MainNavBar.js';
import * as userActions from '../../Store/Actions/userActions';
import gclogo from '../../Assets/Images/gclogo.png';
import './Profile.css';

class Profile extends React.Component {
  componentDidMount() {
    const { setCurrentUser } = this.props;
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (token) {
      const user = {
        id: cookie.get('id'),
        firstName: cookie.get('firstName'),
        lastName: cookie.get('lastName'),
        major: cookie.get('major'),
        email: cookie.get('email')
      };
      setCurrentUser(user);
    }
  }

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
    currentUser: state.loginReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(userActions.setCurrentUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Profile));
