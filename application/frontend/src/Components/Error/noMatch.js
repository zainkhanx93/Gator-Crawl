import React from 'react';
import { Link } from 'react-router-dom';

const noMatch = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Page not found</h1>
    <hr />
    <Link to="/">Back to login page.</Link>
  </div>
);

export default noMatch;
