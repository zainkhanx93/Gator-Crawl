import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './Containers/Login';
import Register from './Containers/Register';

import Team from './Containers/Team';
import TeamMember from './Containers/TeamMember';
import Home from './Containers/Home';
import Profile from './Containers/Profile';
import Cart from './Containers/Cart';
import Messages from './Containers/Messages';
import Product from './Containers/Product';
import MyProducts from './Containers/MyProducts';
import noMatch from './Components/noMatch';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ textAlign: 'center' }}>SFSU Software Engineering Project CSC 648-848, Spring 2020.  For Demonstration Only</p>
        </header>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <Route path="/home/products" exact component={Product} />
          <Route path="/profile/team" exact component={Team} />
          <Route path="/profile/team/:id" exact component={TeamMember} />
          <Route path="/profile/me" exact component={Profile} />
          <Route path="/profile/cart" exact component={Cart} />
          <Route path="/profile/myproducts" exact component={MyProducts} />
          <Route path="/messages" exact component={Messages} />
          <Route component={noMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
