import React from 'react';
import { connect } from 'react-redux';

import MainNavBar from '../Components/Navigation/MainNavBar';
import ProfileNavBar from '../Components/Navigation/ProfileNavBar';
import gclogo from '../Assets/Images/gclogo.png';
import axios from 'axios';
import './Profile.css';

class Profile extends React.Component {
  render() {
    const { history, currentUser } = this.props;

    const setImageFile = file => {
      if (file !== null) {
        const body = new FormData();
        body.append('file', file)
        const userID = currentUser.id;
        console.log(userID);

        // axios.put(`/api/users/image/`,
        //   { params: { userID } },
        //   body)
        axios.put(`/api/users/image/:userID`, body)
          .then(res => {
            console.log(res.data)
          })
      }
    }
    const getImageFile = () => {
      const userID = currentUser.id;
      axios.get(`/api/users/image/`, { params: { userID } })
        .then(res => {
          currentUser.profilePhoto = res.data
          console.log(res.data)
        })
    }

    const me = (
      <div>
        <p className="Title">My Profile</p>
        <div className="User-Box">
          <div className="Profile-Picture-Window">
            <img className="Profile-picture" src={currentUser.profilePhoto} alt="Avatar" />
          </div>
          <div className="User-Info">
            <p>Name: {currentUser.firstName} {currentUser.lastName}</p>
            <p>Email: {currentUser.email}</p>
            <p>Major: {currentUser.major}</p>
          </div>
        </div>
        <br />
        <button className="Button" type="button"> Edit </button>
        <div>
          <input
            type="file"
            name="imgFile"
            onChange={e => setImageFile(e.target.files[0])}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit!"
            onClick={getImageFile}
          />
        </div>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps)(Profile);
