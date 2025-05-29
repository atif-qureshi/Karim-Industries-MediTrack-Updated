import React from 'react';
import './Header.js';
import './Header.css';

const Header = () => {
    return (
        <div>
            <nav class="navbar">
                <div class="logo">
                    <img
                        src="./assets/images/images.jpeg"
                        alt="Description"
                    />
                    <span>Karim <br />Industries</span>
                </div>
                <button class="hamburger" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="Home.html">Home</a></li>
                    <li><a href="About_Us.html">About Us</a></li>
                    <li class="dropdown">
                        <a href="1">Services ▼</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-submenu">
                                <a href="../Html_Files/Custom_Manuf.html">Custom Manufacturing</a>
                                <ul class="dropdown-submenu">
                                    <li><a href="Product_Cust.html">Product Customization</a></li>
                                    <li><a href="Standard_Complin.html">Standards Compliance</a></li>
                                </ul>
                            </li>

                            <li class="dropdown-submenu">
                                <a href="Global_Export.html">Global Export</a>
                                <ul class="dropdown-submenu">
                                    <li><a href="Logistic_Manag.html">Logistics Management</a></li>
                                    <li><a href="Market_Complin.html">Market Compliance</a></li>
                                </ul>
                            </li>

                            <li class="dropdown-submenu">
                                <a href="Exhibbitions_Programs.html">Exhibition Programs</a>
                                <ul class="dropdown-submenu">
                                    <li><a href="Distributers.html">Distributor Collaborations</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="Products.html">Products</a></li>
                    <li><a href="Pr">Contact Us</a></li>
                </ul>
                <div class="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>
            </nav>
        </div>
    )
}

export default Header;
