import React from 'react';

import MainNavBar from '../Nav/MainNavBar';

import gclogo from '../Images/gclogo.png';

import './Profile.css';

class Profile extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <MainNavBar history={history} />
        <div>
          <p className="Title">My Profile</p>
          <div className="Box">
            <img className="Profile-picture" src={gclogo} alt="Logo" />
            <div className="Info">
              Name: Ally Gator
              <br />
              SFSU Email: allygator@mail.sfsu.edu
              <br />
              Phone: (555) 555-5555
              <br />
              Major: Computer Science
              <br />
            </div>
          </div>
          <button className="Button" type="button"> Edit </button>
        </div>
      </div>
    );
  }
}

export default Profile;
