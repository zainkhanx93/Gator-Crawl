import React from 'react';

import MainNavBar from '../Components/Navigation/MainNavBar';
import ProfileNavBar from '../Components/Navigation/ProfileNavBar';
import gclogo from '../Assets/Images/gclogo.png';

import './Profile.css';

class Profile extends React.Component {
  render() {
    const { history } = this.props;

    const me = (
      <div>
        <p className="Title">My Profile</p>
        <div className="User-Box">
          <div className="Profile-Picture-Window">
            <img className="Profile-picture" src={gclogo} alt="Logo" />
          </div>
          <div className="User-Info">
            <p>Name: Ally Gator</p>
            <p>Email: allygator@mail.sfsu.edu</p>
            <p>Major: Computer Science</p>
          </div>
        </div>
        <br />
        <button className="Button" type="button"> Edit </button>
      </div>
    );

    return (
      <div>
        <MainNavBar history={history} />
        <div className="userwindow">
          <div className="leftside">
            <ProfileNavBar />
          </div>
          <div className="rightside">
            {me}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
