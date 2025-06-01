import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img
                        src="/assets/images/images.jpeg" // Ensure this path is correct in public folder
                        alt="Description"
                    />
                    <span>Karim <br />Industries</span>
                </div>

                <button className="hamburger" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>

                    <li className="dropdown">
                        <Link to="#">Services ▼</Link>
                        <ul className="dropdown-menu">
                            <li className="dropdown-submenu">
                                <Link to="/CustomManuf">Custom Manufacturing</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/ProductCustomization">Product Customization</Link></li>
                                    <li><Link to="/StandardCompliance">Standards Compliance</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-submenu">
                                <Link to="/GlobalExport">Global Export</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/services/logistics-management">Logistics Management</Link></li>
                                    <li><Link to="/services/market-compliance">Market Compliance</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown-submenu">
                                <Link to="/services/exhibition-programs">Exhibition Programs</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/services/distributor-collaborations">Distributor Collaborations</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>

                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>
            </nav>
        </div>
    )
}

export default Header;
