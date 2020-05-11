import React from 'react';
import { NavLink } from 'react-router-dom';

// import SearchBar from '../Search/SearchBar';
import navBarlogo from '../../Assets/Images/NavBarLogo.png';
import homeimage from '../../Assets/Images/home.png';
import messagesimage from '../../Assets/Images/messages.png';
import userimage from '../../Assets/Images/user.png';
import logoutimage from '../../Assets/Images/logout.png';


import './MainNavBar.css';

const navBarItems = (
  <nav className="navbar-items">
    <NavLink to="/home" className="nav-item" activeClassName="nav-item-active">
      <img src={homeimage} className="nav-image" alt="Home" />
    </NavLink>
    <NavLink to="/messages" className="nav-item" activeClassName="nav-item-active">
      <img src={messagesimage} className="nav-image" alt="Messages" />
    </NavLink>
    <NavLink to="/profile" className="nav-item" activeClassName="nav-item-active">
      <img src={userimage} className="nav-image" alt="User" />
    </NavLink>
    <NavLink to="/logout" className="nav-item" activeClassName="nav-item-active">
      <img src={logoutimage} className="nav-image" alt="Logout" />
    </NavLink>

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
          {navBarItems}
        </header>
        <hr className="navbar-line" />
      </div>
    );
  }
}

export default MainNavBar;
