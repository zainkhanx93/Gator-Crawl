import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavBar.css';

class ProfileNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="profile-navbar-items">
          <NavLink to="/profile" className="profile-nav-item" activeClassName="profile-item-active">
            <p>Profile</p>
          </NavLink>
          <NavLink to="/profile/cart" className="profile-nav-item" activeClassName="profile-item-active">
            <p>My Cart</p>
          </NavLink>
          <NavLink to="/profile/myproducts" className="profile-nav-item" activeClassName="profile-item-active">
            <p>My Products</p>
          </NavLink>
          <NavLink to="/profile/team" className="profile-nav-item" activeClassName="profile-item-active">
            <p>About Us</p>
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default ProfileNavBar;
