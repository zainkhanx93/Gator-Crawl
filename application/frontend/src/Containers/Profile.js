import React from 'react';

import gclogo from '../Assets/Images/gclogo.png';
import MainNavBar from '../Components/Navigation/MainNavBar.js';


import './Profile.css';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <MainNavBar />
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
