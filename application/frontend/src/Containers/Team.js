import React from 'react';
import { connect } from 'react-redux';
import './Team.css';

import MainNavBar from '../Components/Navigation/MainNavBar';
import * as teamActions from '../Store/Actions/teamActions';

class Team extends React.Component {
  render() {
    const {
      team,
      history,
      setUserClicked
    } = this.props;

    const handleClick = (member) => {
      setUserClicked(member);
      history.push(`/team/${member.id}`);
    };

    return (
      <div>
        <MainNavBar history={history} />
        <h1 className="Title"><u>Our Team</u></h1>
        <ul>
          <div className="Box" onClick={() => handleClick(team.one)}>{team.one.firstname} {team.one.lastname}</div>
          <div className="Box" onClick={() => handleClick(team.two)}>{team.two.firstname} {team.two.lastname}</div>
          <div className="Box" onClick={() => handleClick(team.three)}>{team.three.firstname} {team.three.lastname}</div>
          <div className="Box" onClick={() => handleClick(team.four)}>{team.four.firstname} {team.four.lastname}</div>
          <div className="Box" onClick={() => handleClick(team.five)}>{team.five.firstname} {team.five.lastname}</div>
          <div className="Box" onClick={() => handleClick(team.six)}>{team.six.firstname} {team.six.lastname}</div>
        </ul>
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
