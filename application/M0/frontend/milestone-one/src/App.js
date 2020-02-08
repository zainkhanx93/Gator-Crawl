import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import noMatch from './Components/noMatch';
import Team from './Containers/Team';
import TeamMember from './Containers/TeamMember';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          CSC 648, Section 2
          <br />
          Software Engineering, Spring 2020
          <br />
          Team 1
        </header>
        <Switch>
          <Redirect exact from="/" to="/team" />
          <Route path="/team" exact component={Team} />
          <Route path='/team/:id' exact component={TeamMember} />
          <Route component={noMatch} />
        </Switch>

      </div>
    );
  }
}

export default App;
