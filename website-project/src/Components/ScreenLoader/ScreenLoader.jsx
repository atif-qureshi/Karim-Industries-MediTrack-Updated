// components/ScreenLoader.jsx
import React from 'react';
import './ScreenLoader.css';

const ScreenLoader = () => {
    return (
        <div className="screen-loader">
            <div className="blur-background"></div>
            <div className="spinner"></div>
        </div>
    );
};

export default ScreenLoader;