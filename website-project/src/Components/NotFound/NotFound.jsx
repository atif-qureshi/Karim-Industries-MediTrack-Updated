import React from 'react';
import './NotFound.css';

const NotFound = () => (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <h2 className="notfound-subtitle">Page Not Found</h2>
    <p className="notfound-message">The page you are looking for doesn't exist or has been moved.</p>
  </div>
);

export default NotFound;