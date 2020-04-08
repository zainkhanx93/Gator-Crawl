import React from 'react';
import {
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './Containers/Login';
import Register from './Containers/Register';

import Team from './Containers/Team';
import TeamMember from './Containers/TeamMember';
import SearchResults from './Containers/SearchResults';
import noMatch from './Components/noMatch';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <nav>
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/team" className="nav-item">
              Team
            </Link>
          </nav>
          CSC 648, Section 2
          <br />
          Software Engineering, Spring 2020
          <br />
          Team 1
          <br />
        </header> */}
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/searchresults" exact component={SearchResults} />
          <Route path="/team" exact component={Team} />
          <Route path="/team/:id" exact component={TeamMember} />
          <Route component={noMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
