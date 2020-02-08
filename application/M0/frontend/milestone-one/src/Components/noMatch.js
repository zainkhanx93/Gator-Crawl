import React from 'react';
import { Link } from 'react-router-dom';


const noMatch = () => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Page not found</h1>
    <hr />
    <Link to="/team">Back to our team page.</Link>
  </div>
);

export default noMatch;
