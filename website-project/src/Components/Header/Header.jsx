import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './Images/logo.jpeg';
import Hamburger from './Hamburger.js';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchError, setSearchError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef(null);

    const products = useMemo(() => [
        {
            id: 1,
            name: "Medi Cot",
            title: "Absorbent Cotton Wool",
            path: "/products/1",
            description: "100% bleached absorbent cotton complying with BP/BPC specifications. Used for absorption of exudates, peripheral cleaning wounds and supporting the application of products on the skin.",
            features: [
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g, 400g, 500g, 1000g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: "medi-cot.jpg"
        },
        {
            id: 2,
            name: "Medi Balls",
            title: "Cotton Balls",
            path: "/products/2",
            description: "Soft, gentle & non-allergic cotton balls for medical & cosmetic use. 100% bleached absorbent cotton complying with BP standards.",
            features: [
                "Used for absorption of exudates and wound cleaning",
                "Chemical inert and free of any optical brightener",
                "Sterile before use",
                "Standard Weight: 1g to 5g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: "medi-balls.jpg"
        },
        {
            id: 3,
            name: "Medi Zig Zag",
            title: "Zig Zag Cotton",
            path: "/products/3",
            description: "100% bleached absorbent cotton in zig zag form for better absorption and wound care.",
            features: [
                "Complying with BP/BPC specifications",
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: "zig-zag.jpg"
        },
        {
            id: 4,
            name: "Ortho Cot",
            title: "Non Absorbent Cotton",
            path: "/products/4",
            description: "Orthopedic padding that provides soft, comfortable cushioning and protection for the patient.",
            features: [
                "100% bleached Non Absorbent Cotton",
                "Used for padding under Plaster of Paris Bandage (POP)",
                "Standard Sizes: 3 inches, 4 inches, 6 inches"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "ortho-cot.jpg"
        },
        {
            id: 5,
            name: "Medi Crepe",
            title: "Cotton Crepe Bandage",
            path: "/products/5",
            description: "Non-adhesive bandage of high-quality cotton yarns for reinforcement of strains, sprains and weak joints.",
            features: [
                "Shapes around contours of the joint offering enhanced support",
                "Lightweight and breathable",
                "100% cotton yarn",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 3m & 4.5m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "crepe-bandage.jpg"
        },
        {
            id: 6,
            name: "Medi Plast",
            title: "Plaster of Paris Bandage",
            path: "/products/6",
            description: "Made of 100% pure hydrophilic cotton Leno gauze coated with natural POP for fast and durable immobilization.",
            features: [
                "X-Ray permeable",
                "Does not absorb X-Rays",
                "Setting time as per method",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 2.7m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "pop-bandage.jpg"
        },
        {
            id: 7,
            name: "Medi Band",
            title: "Open Wove Bandage",
            path: "/products/7",
            description: "Basic bandage with loose weave for ventilation, ideal for securing dressings without pressure.",
            features: [
                "Non-elastic design for wound dressings",
                "Ventilation for burns/non-bleeding wounds",
                "100% cotton",
                "Standard Size: Width: 5cm, 6.5cm, 7.5cm, 10cm, 15cm x Length: 3m, 4m, 5m, & 6m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "open-wove.jpg"
        },
        {
            id: 8,
            name: "Medi Triangular",
            title: "Triangular Bandage",
            path: "/products/8",
            description: "Made of 100% cotton for versatile medical use including slings and securing dressings.",
            features: [
                "Complete with two Safety pins",
                "Support to arms and shoulders (sling)",
                "To secure splints and dressing",
                "To control bleeding (tourniquet)"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "triangular-bandage.jpg"
        },
        {
            id: 9,
            name: "Soft Gauze",
            title: "Gauze Swab",
            path: "/products/9",
            description: "Highly absorbent disposable Gauze pads for wound care and cleaning.",
            features: [
                "Made from 100% cotton Threads",
                "Pre-washed and packed in Sterile/Non Sterile Pouches",
                "Folded edges to minimize lint",
                "Standard Size: 7.5cm x 7.5cm, 10cm x 10cm, 15cm x 15cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "gauze-swab.jpg"
        },
        {
            id: 10,
            name: "Me Soft Gauze",
            title: "Gauze Swab USP-IV",
            path: "/products/10",
            description: "Sterilized gauze swabs complying with United States Pharmacopeia standards.",
            features: [
                "8ply, 12ply & 16ply options",
                "X-Ray detectable thread available",
                "Heat Blister Pack or Hard Blister Pack",
                "Standard Size: 10cm x 10cm, 15cm x 15cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "usb-gauze.jpg"
        },
        {
            id: 11,
            name: "Soft Gauze Roll",
            title: "Surgical Gauze Roll",
            path: "/products/11",
            description: "Highly absorbent disposable Surgical Gauze for wound management.",
            features: [
                "Made from 100% cotton Threads",
                "Sterile Before Use",
                "Standard Size: Width: 1m x Length: 2.5m, 5m, 10m, 20m, 30m, 40m, 50m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "gauze-roll.jpg"
        },
        {
            id: 12,
            name: "Medi Lint Gauze",
            title: "Lint Gauze Roll",
            path: "/products/12",
            description: "Highly absorbent secondary dressing, suitable for exuding wounds.",
            features: [
                "Soft and conformable, ideal for awkward joints",
                "Helps protect and cushion most wounds",
                "Standard Size: 50g, 500g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: "lint-gauze.jpg"
        },
        {
            id: 13,
            name: "Medi Lap Sponges",
            title: "Lap Sponges BP-II",
            path: "/products/13",
            description: "Surgical invasive dressing material for intraoperative use with X-Ray detectable thread.",
            features: [
                "Absorption of large amounts of blood and body fluids",
                "X-Ray detectable thread or chip",
                "Standard Size: 30cm × 30cm, 45cm × 45cm (4ply, 6ply, 8ply)"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "lap-sponges.jpg"
        },
        {
            id: 14,
            name: "Medi Sofra Tulle",
            title: "Framycetin Sulphate Gauze",
            path: "/products/14",
            description: "Antibacterial tulle dressing impregnated with Framycetin Sulphate for infected wounds.",
            features: [
                "Topical Antibiotic Patch",
                "Prevents wound edges from drying",
                "Recommended for infected wounds and chronic wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "sofra-tulle.jpg"
        },
        {
            id: 15,
            name: "Septi Grass Tulle",
            title: "Chlorhexidine Tulle",
            path: "/products/15",
            description: "Antiseptic dressing impregnated with Chlorhexidine for wound care.",
            features: [
                "Prevents infection in wounds",
                "Keeps proper moisture in the wound",
                "Recommended for surgical and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "chlorhexidine-tulle.jpg"
        },
        {
            id: 16,
            name: "Medi Paraffin",
            title: "Paraffin Gauze",
            path: "/products/16",
            description: "Gauze dressings impregnated with paraffin ointment for wound moisture management.",
            features: [
                "Prevents wound edges from drying",
                "Recommended for infected wounds",
                "Treats bedsores, ulcers, and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "paraffin-gauze.jpg"
        },
        {
            id: 17,
            name: "Fustin Tulle",
            title: "Sodium Fusidate Gauze",
            path: "/products/17",
            description: "Antibacterial dressing impregnated with Sodium Fusidate for infected wounds.",
            features: [
                "Topical Antibiotic Patch",
                "Treats surgical wounds and burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "fustin-tulle.jpg"
        },
        {
            id: 18,
            name: "Medi Eye Pad",
            title: "Gauze Eye Pad",
            path: "/products/18",
            description: "Specialized dressing for eye protection and wound care.",
            features: [
                "Soft and comfortable for sensitive eye area",
                "Sterile packaging",
                "Standard Size: Eye-specific dimensions"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "eye-pad.jpg"
        },
        {
            id: 19,
            name: "Povee-Tulle",
            title: "Povidone-Iodine Gauze",
            path: "/products/19",
            description: "Antiseptic dressing with Povidone-Iodine 10% for infected wound management.",
            features: [
                "Topical Antiseptic Tulle Dressing",
                "Prevents wound maceration",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "povidone-tulle.jpg"
        },
        {
            id: 20,
            name: "Silva Tulle",
            title: "Silver Sulfadiazine Gauze",
            path: "/products/20",
            description: "Antibacterial dressing with Silver Sulfadiazine 1% for burn and wound care.",
            features: [
                "Topical Antibacterial Tulle Dressing",
                "Prevents infection in burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "silver-tulle.jpg"
        },
        {
            id: 21,
            name: "Surgi Grip",
            path: "/products/21",
            title: "Surgical Adhesive Paper Tape",
            description: "Medical-grade adhesive tape for securing dressings and devices.",
            features: [
                "Painless removal without irritation",
                "Allows airflow while keeping skin dry",
                "Standard Size: Width: 0.5-5 inch, Length: 3-9 Yard"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "surgical-tape.jpg"
        },
        {
            id: 22,
            name: "Alco Swab",
            title: "Alcohol Swab",
            path: "/products/22",
            description: "70% Isopropyl Alcohol swabs for disinfection and skin preparation.",
            features: [
                "Individually packaged for hygiene",
                "Dries fast with no residue",
                "Standard Size: 3cmx3cm, 6cmx6cm, 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "alcohol-swab.jpg"
        },
        {
            id: 23,
            name: "Medicare Drape Kit",
            title: "Surgical Drape Kit Set",
            path: "/products/23",
            description: "Complete sterile drape kits for various surgical procedures.",
            features: [
                "Non-woven fabric for durability",
                "Full coverage for sterile conditions",
                "Types: C-Section, Ortho, Universal, Laparoscopic, PCNL, Knee Replacement"
            ],
            sizes: "Available in all configurations as per customer demand",
            image: "drape-kit.jpg"
        },
        {
            id: 24,
            name: "Medicare Gown",
            title: "Surgical Gown",
            path: "/products/24",
            description: "Protective gowns for medical professionals with fluid-resistant properties.",
            features: [
                "SMS/SMMS non-woven fabric",
                "Breathable yet fluid-resistant",
                "Available in Medium, Large, XL, XXL",
                "Options: Surgical Gown, Reinforced Gown, Isolation Gown"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: "surgical-gown.jpg"
        }
    ], []);

    // Clear search input and close menu when route changes
    useEffect(() => {
        setSearchTerm('');
        setShowSuggestions(false);
        setMobileMenu(false);
    }, [location.pathname]);

    // Filter suggestions as user types (frontend only)
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [searchTerm, products]);

    // Hide suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search submit
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
            p => p.name.trim().toLowerCase() === trimmed.toLowerCase()
        );

        if (exactMatch) {
            setSearchTerm('');
            setShowSuggestions(false);
            setMobileMenu(false);
            navigate(`/products/${exactMatch.id}`); // 👈 use `id` from array
        } else {
            setPopupMessage(`"${searchTerm}" not found. Try a valid product name.`);
            setShowPopup(true);
        }
    };

    // On suggestion click
    const handleSuggestionClick = (product) => {
        setSearchTerm(product.name);
        setShowSuggestions(false);
        setSearchError('');
    };

    const handleHamburger = () => setMobileMenu(prev => !prev);
    const closeMenu = () => setMobileMenu(false);

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Description" />
                    <span>Karim <br />Industries</span>
                </div>

                <Hamburger isActive={mobileMenu} onClick={handleHamburger} />

                <ul className={`nav-links${mobileMenu ? ' active' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/AboutUs" onClick={closeMenu}>About Us</Link></li>
                    <li className="dropdown">
                        <Link to="/Services" onClick={closeMenu}>Services ▼</Link>
                        <ul className="dropdown-menu">
                            <li className="dropdown-submenu">
                                <Link to="/CustomManuf" onClick={closeMenu}>Custom Manufacturing</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/StandardCompliance" onClick={closeMenu}>Standards Compliance</Link></li>
                                    <li><Link to="/MarketCompliance" onClick={closeMenu}>Market Compliance</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown-submenu">
                                <Link to="/GlobalExport" onClick={closeMenu}>Global Export</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/LogisticManagement" onClick={closeMenu}>Logistics Management</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown-submenu">
                                <Link to="/ExhibitionProgram" onClick={closeMenu}>Exhibition Programs</Link>
                                <ul className="dropdown-submenu">
                                    <li><Link to="/DistributerCollaboration" onClick={closeMenu}>Distributor Collaborations</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><Link to="/Products" onClick={closeMenu}>Products</Link></li>
                    <li><Link to="/ContactUs" onClick={closeMenu}>Contact Us</Link></li>
                    <li style={{ display: "none" }}>
                        <Link to="/owner-login" onClick={closeMenu}>Owner Login</Link>
                    </li>
                </ul>

                {/* Search Bar */}
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

                    {searchError && (
                        <div className="search-error">{searchError}</div>
                    )}

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="search-suggestions">
                            {suggestions.map(product => (
                                <li
                                    key={product.id}
                                    onClick={() => handleSuggestionClick(product)}
                                >
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
