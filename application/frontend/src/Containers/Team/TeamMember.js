import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as userActions from '../Actions/userActions';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import './TeamMember.css';

class TeamMember extends React.Component {
  render() {
    const {
      team,
      // userClicked,
      history
    } = this.props;

    console.log(history);
    // console.log(history.location.pathname);
    const n = history.location.pathname.slice(14);
    // console.log(n);
    let user = <div />;

    switch (n) {
      case '1':
        user = (
          <div className="profile">
            <p>{team.one.firstname} {team.one.lastname}</p>
            <p>{team.one.role}</p>
            <p>{team.one.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      case '2':
        user = (
          <div className="profile">
            <p>{team.two.firstname} {team.two.lastname}</p>
            <p>{team.two.role}</p>
            <p>{team.two.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      case '3':
        user = (
          <div className="profile">
            <p>{team.three.firstname} {team.three.lastname}</p>
            <p>{team.three.role}</p>
            <p>{team.three.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      case '4':
        user = (
          <div className="profile">
            <p>{team.four.firstname} {team.four.lastname}</p>
            <p>{team.four.role}</p>
            <p>{team.four.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      case '5':
        user = (
          <div className="profile">
            <p>{team.five.firstname} {team.five.lastname}</p>
            <p>{team.five.role}</p>
            <p>{team.five.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      case '6':
        user = (
          <div className="profile">
            <p>{team.six.firstname} {team.six.lastname}</p>
            <p>{team.six.role}</p>
            <p>{team.six.about}</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
      default:
        user = (
          <div>
            <p>oops no such user</p>
            <hr />
            <Link to="/profile/team">Back to our team page.</Link>
          </div>
        );
        break;
    }
    return (
      <div>
        <MainNavBar history={history} />
        <div className="teamwindow">
          <div className="teamleftside"><ProfileNavBar /></div>
          <div className="teamrightside">
            <p className="Title">About Us </p>
            <div className="wholeteam">
              { user }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // userClicked: state.teamReducer.userClicked,
    team: state.teamReducer.team
  };
};

// const mapDispatchToProps = (dispatch) => {
// return {
// fetchUser: (id) => dispatch(userActions.fetchUser(id))
// };
// };
export default connect(mapStateToProps)(TeamMember);
