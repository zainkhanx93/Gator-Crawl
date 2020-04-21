import React from 'react';
import { Link } from 'react-router-dom';

class ProfileNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="profile-navbar-items">
          <Link to="/profile/me" className="profile-nav-item">
            <p>Profile</p>
          </Link>
          <Link to="/profile/cart" className="profile-nav-item">
            <p>My Cart</p>
          </Link>
          <Link to="/profile/myproducts" className="profile-nav-item">
            <p>My Products</p>
          </Link>
          <Link to="/profile/team" className="profile-nav-item">
            <p>About Us</p>
          </Link>
          <Link to="/" className="profile-nav-item">
            <p>Log Out</p>
          </Link>
        </nav>
      </div>
    );
  }
}

export default ProfileNavBar;
