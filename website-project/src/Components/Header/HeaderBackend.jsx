import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './Images/logo.jpg';
import Hamburger from './Hamburger.js';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    setSearchTerm('');
    setShowSuggestions(false);
    setMobileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchTerm, products]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    const trimmed = searchTerm.trim();

    if (trimmed === '') {
      setPopupMessage('Please enter a product name');
      setShowPopup(true);
      return;
    }

    const exactMatch = products.find(
      (p) => p.name.trim().toLowerCase() === trimmed.toLowerCase()
    );

    if (exactMatch) {
      setSearchTerm('');
      setShowSuggestions(false);
      setMobileMenu(false);
      navigate(`/products/${exactMatch.id}`);
    } else {
      setPopupMessage(`"${searchTerm}" not found. Try a valid product name.`);
      setShowPopup(true);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    setShowSuggestions(false);
    setSearchError('');
  };

  const handleHamburger = () => setMobileMenu((prev) => !prev);
  const closeMenu = () => setMobileMenu(false);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Description" />
          <span>
            Karim <br />Industries
          </span>
        </div>

        <Hamburger isActive={mobileMenu} onClick={handleHamburger} />

        <ul className={`nav-links${mobileMenu ? ' active' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li className="dropdown">
            <Link to="/Services">Services</Link>
            <ul className="dropdown-menu">
              {window.innerWidth <= 768 ? (
                <>
                  <li className="left-links">
                    <Link to="/DistributerCollaboration">Distributor Collaborations</Link>
                    <Link to="/LogisticManagement">Logistics Management</Link>
                    <Link to="/StandardCompliance">Standards Compliance</Link>
                    <Link to="/ExhibitionProgram">Exhibition Programs</Link>
                    <Link to="/MarketCompliance">Market Compliance</Link>
                    <Link to="/GlobalExport">Global Export</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="dropdown-submenu">
                    <Link to="/StandardCompliance" onClick={closeMenu}>
                      Standards Compliance
                    </Link>
                    <ul className="dropdown-submenu">
                      <li>
                        <Link to="/MarketCompliance" onClick={closeMenu}>
                          Market Compliance
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <Link to="/GlobalExport" onClick={closeMenu}>
                      Global Export
                    </Link>
                    <ul className="dropdown-submenu">
                      <li>
                        <Link to="/LogisticManagement" onClick={closeMenu}>
                          Logistics Management
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <Link to="/ExhibitionProgram" onClick={closeMenu}>
                      Exhibition Programs
                    </Link>
                    <ul className="dropdown-submenu">
                      <li>
                        <Link to="/DistributerCollaboration" onClick={closeMenu}>
                          Distributor Collaborations
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </li>
          <li>
            <Link to="/Products" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/ContactUs" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>
          <li style={{ display: 'none' }}></li>
        </ul>

        <div className="search-bar" ref={searchInputRef}>
          <form onSubmit={handleSearch} autoComplete="off">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setSearchError('');
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
            />
            <button type="submit">Search</button>
          </form>

          {searchError && <div className="search-error">{searchError}</div>}

          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((product) => (
                <li key={product.id} onClick={() => handleSuggestionClick(product)}>
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p>{popupMessage}</p>
              <button onClick={() => setShowPopup(false)}>OK</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
