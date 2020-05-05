import React from 'react';
import { Link } from 'react-router-dom';
import navBarlogo from '../Images/NavBarLogo.PNG';
import SearchBar from '../Components/SearchBar';

import './MainNavBar.css';

const navBarItems = (
  <nav className="navbar-items">
    <Link to="/profile/me" className="nav-item">
      Profile
    </Link>
    <Link to="/team" className="nav-item">
      Team
    </Link>
    <Link to="/cart" className="nav-item">
      Cart
    </Link>
    <Link to="/" className="nav-item">
      Logout
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
          <img className="navbar-logo" src={navBarlogo} alt="NavBarLogo" />
          <SearchBar history={history} className="navbar-searchbar" />
          {navBarItems}
        </header>
        <hr className="navbar-line" />
      </div>
    );
  }
}

export default MainNavBar;
