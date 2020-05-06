import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavBar.css';

const MainNavBar = (props) => {
  return (
    <div className="MainNavBar">
      <header className="Nav-header">
        <nav>
          <Link to="/searchresults" className="nav-item">
            Search
          </Link>
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
      </header>
      <hr className="Nav-line" />
    </div>
  );
}

export default MainNavBar;