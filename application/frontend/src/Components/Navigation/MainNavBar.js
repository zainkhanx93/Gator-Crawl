import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../Search/SearchBar';
import navBarlogo from '../../Assets/Images/NavBarLogo.png';

import './MainNavBar.css';

const navBarItems = (
  <nav className="navbar-items">
    <Link to="/home" className="nav-item">
      Home
    </Link>
    <Link to="/messages" className="nav-item">
      Messages
    </Link>
    <Link to="/profile/me" className="nav-item">
      Account
    </Link>

  </nav>
);

class MainNavBar extends React.Component {
  render() {
    const { history } = this.props;
    // console.log(history);
    return (
      <div className="navbar-window">
        <header className="navbar-header">
          <div onClick={() => history.push('/home')}>
            <img className="navbar-logo" src={navBarlogo} alt="NavBarLogo" />
          </div>
          <SearchBar history={history} className="navbar-searchbar" />
          {navBarItems}
        </header>
        <hr className="navbar-line" />
      </div>
    );
  }
}

export default MainNavBar;
