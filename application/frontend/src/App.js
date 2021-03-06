import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ReactGA from 'react-ga';
import PublicProfile from './Containers/PublicProfile/PublicProfile';
import Login from './Containers/LoginRegister/Login';
import Register from './Containers/LoginRegister/Register';
import Team from './Containers/Team/Team';
import TeamMember from './Containers/Team/TeamMember';
import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';
import Cart from './Containers/Cart/Cart';
import Messages from './Containers/Messages/Messages';
import Product from './Containers/Product/Product';
import MyProducts from './Containers/MyProducts/MyProducts';
import Admin from './Containers/Admin/Admin';
import noMatch from './Components/Error/noMatch';

import FileUpload from './Containers/Test/TestImageUpload';

import './App.css';
// import auth from './auth.ts'; // Sample authentication provider

const trackingId = 'UA-83674682-2'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.set({
  pageview: `${window.location}/login`,
  // any data that is relevant to the user session
  // that you would like to track with google analytics
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ textAlign: 'center' }}>
            SFSU Software Engineering Project CSC 648-848, Spring 2020. For
            Demonstration Only.
          </p>
        </header>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Redirect exact from="/logout" to="/login" />
          <Route path="/imageUpload" exact component={FileUpload} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <Route path="/home/products" exact component={Product} />
          <Route path="/profile/team" exact component={Team} />
          <Route path="/profile/team/:id" exact component={TeamMember} />
          <Route path="/user/:id" exact component={PublicProfile} />
          <Route path="/profile/" exact component={Profile} />
          <Route path="/profile/cart" exact component={Cart} />
          <Route path="/profile/myproducts" exact component={MyProducts} />
          <Route path="/messages" exact component={Messages} />
          <Route path="/admin" exact component={Admin} />
          <Route component={noMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
