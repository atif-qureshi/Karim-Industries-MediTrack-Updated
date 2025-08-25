import React from 'react';

const Hamburger = ({ isActive, onClick }) => (
    <button
        className={`hamburger${isActive ? ' active' : ''}`}
        aria-label="Toggle navigation"
        onClick={onClick}
        type="button"
    >
        <span></span>
        <span></span>
        <span></span>
        
    </button>
);

export default Hamburger;