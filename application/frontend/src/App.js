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
import Profile from './Containers/Profile';
import Cart from './Containers/Cart';
import noMatch from './Components/noMatch';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/searchresults" exact component={SearchResults} />
          <Route path="/team" exact component={Team} />
          <Route path="/team/:id" exact component={TeamMember} />
          <Route path="/profile/me" exact component={Profile} />
          <Route path="/cart" exact component={Cart} />
          <Route component={noMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
