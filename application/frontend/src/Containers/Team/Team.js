import React from 'react';
import { connect } from 'react-redux';

import MainNavBar from '../../Components/Navigation/MainNavBar';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import * as teamActions from '../../Store/Actions/teamActions';
import './Team.css';

class Team extends React.Component {
  render() {
    const {
      team,
      history,
      setUserClicked
    } = this.props;

    const handleClick = (member) => {
      setUserClicked(member);
      history.push(`/profile/team/${member.id}`);
    };

    return (
      <div>
        <MainNavBar history={history} />
        <div className="teamwindow">
          <div className="teamleftside"><ProfileNavBar /></div>
          <div className="teamrightside">
            <p className="Title">About Us </p>
            <p style={{ textAlign: 'center' }}>
              <i>We are Team 1, a group of students taking CSC648 at SFSU and made this website for our class project.</i>
            </p>
            <div className="wholeteam">
              <div
                style={{ width: '300px' }}
                className="Member-Box"
                onClick={() => handleClick(team.one)}
              >
                {team.one.firstname} {team.one.lastname}
              </div>
              <div
                style={{ width: '300px' }}
                className="Member-Box"
                onClick={() => handleClick(team.two)}
              >{team.two.firstname} {team.two.lastname}
              </div>
              <div
                style={{ width: '300px' }}
                className="Member-Box"
                onClick={() => handleClick(team.three)}
              >{team.three.firstname} {team.three.lastname}
              </div>
              <div
                style={{ width: '300px' }}
                className="Member-Box"
                onClick={() => handleClick(team.four)}
              >{team.four.firstname} {team.four.lastname}
              </div>
              <div
                style={{ width: '300px' }}
                className="Member-Box"
                onClick={() => handleClick(team.five)}
              >{team.five.firstname} {team.five.lastname}
              </div>
              <div
                style={{ width: '300px' }} 
                className="Member-Box"
                onClick={() => handleClick(team.six)}
              >{team.six.firstname} {team.six.lastname}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    team: state.teamReducer.team,
    userClicked: state.teamReducer.userClicked
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserClicked: (id) => dispatch(teamActions.setUserClicked(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
