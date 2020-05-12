import React from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import Modal from '../../Components/UI/Modal';

import LoginChecker from '../HOC/LoginChecker';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import MainNavBar from '../../Components/Navigation/MainNavBar.js';
import * as userActions from '../../Store/Actions/userActions';
import gclogo from '../../Assets/Images/gclogo.png';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false,
      firstName: null,
      lastName: null,
      major: null,
    };
  }

  componentDidMount() {
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
    });
  }

  hideModal = () => {
    this.setState({ isModalShowing: false });
  };

  handleSubmit = () => {
    const { history, currentUser } = this.props;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios
      .patch(
        `/api/users/${currentUser.id}`,
        {
          major: this.state.major,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res) {
          this.setState({ isModalShowing: false });
          window.location.reload();
        }
      });
  };

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
            <button
              className="editButton"
              type="button"
              onClick={(e) => {
                this.setState({ isModalShowing: true });
              }}
            >
              {' '}
              Edit{' '}
            </button>
          </div>
          <br />
        </div>
      </div>
    );

    return (
      <div>
        <Modal show={this.state.isModalShowing} modalClosed={this.hideModal}>
          <form style={{ paddingBottom: '20px' }}>
            <div>
              <h3>First Name: </h3>
              <input
                className="Input-Field"
                onChange={(e) => {
                  this.setState({ firstName: e.target.value });
                }}
              />
              {!this.state.firstName && (
                <p className="errormessage">First Name cannot be empty</p>
              )}
            </div>
            <div>
              <h3>Last Name: </h3>
              <input
                className="Input-Field"
                onChange={(e) => {
                  this.setState({ lastName: e.target.value });
                }}
              />
              {!this.state.lastName && (
                <p className="errormessage">Last Name cannot be empty</p>
              )}
            </div>
            <div>
              <h3>Major: </h3>
              <input
                className="Input-Field"
                onChange={(e) => {
                  this.setState({ major: e.target.value });
                }}
              />
              {!this.state.major && (
                <p className="errormessage">Major cannot be empty</p>
              )}
            </div>
            <button
              disabled={
                !this.state.major
                || !this.state.firstName
                || !this.state.lastName
              }
              type="button"
              className="Login-Button"
              onClick={() => this.handleSubmit()}
            >
              Save
            </button>
          </form>
        </Modal>
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
    setCurrentUser: (user) => dispatch(userActions.setCurrentUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginChecker(Profile));
