import React from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../Store/Actions/profileActions';

import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: ''
    };
  }
  //
  // state = {
  //   firstname: ''
  // };

  handleChange(event) {
    console.log(event.target.value);
    // this.setState({ firstname: event.target.value });
  }

  render() {
    const {
      myprofile,
      changeFirstName
    } = this.props;

    const {
      firstname
    } = this.state;

    return (
      <div className="left">
        <h1>profile</h1>
        <p>{myprofile.firstname} {myprofile.lastname}</p>
        <p>{myprofile.major}</p>
        <hr />
        <input
          type="text"
          onChange={this.handleChange}
          value={firstname}
        />
        <br />
        <button type="submit" onClick={() => changeFirstName(firstname)}>Click to change First Name</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // team: state.teamReducer.team,
    myprofile: state.profileReducer.myprofile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setUserClicked: (id) => dispatch(teamActions.setUserClicked(id)),
    changeFirstName: (firstname) => dispatch(profileActions.changeFirstName(firstname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
