import React, { useState } from 'react';
import './DistributerCollabration.css';

const DistributerCollabration = () => {
    const [activeTab, setActiveTab] = useState('cotton');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <main className="distributor-container">
                {/* <!-- Hero Section --> */}
                <section className="distributor-hero">
                    <h1>Distributor Collaborations</h1>
                    <p>
                        Partnering with distributors worldwide to deliver quality surgical
                        dressing products
                    </p>
                </section>

                {/* <!-- Introduction Section --> */}
                <section className="collaboration-intro">
                    <h2>Our Distribution Network</h2>
                    <p>
                        Karim Industries works with trusted distributors across global markets
                        to ensure our BP, BPC, and USP compliant surgical dressing products
                        reach healthcare providers efficiently. Our manufacturing capabilities
                        allow us to fulfill orders of all sizes according to customer demand.
                    </p>
                </section>

                {/* <!-- Benefits Section --> */}
                <section className="distributor-benefits">
                    <h2>Why Partner With Us</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-medal"></i>
                            </div>
                            <h3>Quality Products</h3>
                            <p>
                                BP/BPC and USP compliant surgical dressings manufactured to the
                                highest standards
                            </p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-boxes"></i>
                            </div>
                            <h3>Flexible Ordering</h3>
                            <p>Available in all sizes and weights as per customer demand</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <h3>Global Reach</h3>
                            <p>
                                Established logistics network for reliable international
                                distribution
                            </p>
                        </div>
                    </div>
                </section>

                <section className="product-range">
                    <h2>Our Product Range for Distributors</h2>
                    <div className="product-tabs">
                        <div className="tab-header">
                            <button
                                className={`tab-button ${activeTab === 'cotton' ? 'active' : ''}`}
                                onClick={() => handleTabClick('cotton')}
                            >
                                Cotton Products
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'bandages' ? 'active' : ''}`}
                                onClick={() => handleTabClick('bandages')}
                            >
                                Bandages
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'wound-care' ? 'active' : ''}`}
                                onClick={() => handleTabClick('wound-care')}
                            >
                                Wound Care
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'surgical' ? 'active' : ''}`}
                                onClick={() => handleTabClick('surgical')}
                            >
                                Surgical Supplies
                            </button>
                        </div>

                        <div id="cotton" className={`tab-content ${activeTab === 'cotton' ? 'active' : ''}`}>
                            <div className="product-card">
                                <h3>Medi Cot</h3>
                                <p>Absorbent Cotton Wool (BP/BPC Specification)</p>
                                <p>Available in 100g, 200g, 400g, 500g and 1000g</p>
                            </div>
                            <div className="product-card">
                                <h3>Medi Balls</h3>
                                <p>Cotton Balls for medical & cosmetic use</p>
                                <p>Available in 1g to 5g sizes</p>
                            </div>
                            <div className="product-card">
                                <h3>Medi Zig Zag</h3>
                                <p>Zig Zag Cotton (BP/BPC Specification)</p>
                                <p>Available in 100g and 200g</p>
                            </div>
                        </div>

                        <div id="bandages" className={`tab-content ${activeTab === 'bandages' ? 'active' : ''}`}>
                            <div className="product-card">
                                <h3>Medi Crepe</h3>
                                <p>Cotton Crepe Bandage (BP/BPC Specification)</p>
                                <p>Widths: 7.5cm, 10cm, 15cm x Length: 3m & 4.5m</p>
                            </div>
                            <div className="product-card">
                                <h3>Medi Plast</h3>
                                <p>Plaster of Paris Bandage (BP/BPC Specification)</p>
                                <p>Widths: 7.5cm, 10cm, 15cm x Length: 2.7m</p>
                            </div>
                            <div className="product-card">
                                <h3>Medi Band</h3>
                                <p>Open Wove Bandage (BP/BPC Specification)</p>
                                <p>
                                    Widths: 5cm, 6.5cm, 7.5cm, 10cm, 15cm x Length: 3m, 4m, 5m, & 6m
                                </p>
                            </div>
                        </div>

                        <div id="wound-care" className={`tab-content ${activeTab === 'wound-care' ? 'active' : ''}`}>
                            <div className="product-card">
                                <h3>Medi Paraffin</h3>
                                <p>Paraffin Gauze (BP/BPC Specification)</p>
                                <p>Standard Size: 10cm x 10cm</p>
                            </div>
                            <div className="product-card">
                                <h3>Fustin Tulle</h3>
                                <p>Sodium Fusidate Gauze (B.P Specification)</p>
                                <p>Available in multiple patch and roll sizes</p>
                            </div>
                            <div className="product-card">
                                <h3>Silva Tulle</h3>
                                <p>Silver Sulfadiazine Gauze (U.S.P Specification)</p>
                                <p>Available in multiple patch and roll sizes</p>
                            </div>
                        </div>

                        <div id="surgical" className={`tab-content ${activeTab === 'surgical' ? 'active' : ''}`}>
                            <div className="product-card">
                                <h3>Medicare Drape Kit</h3>
                                <p>Surgical Drape Kit Set</p>
                                <p>Available for various surgical procedures</p>
                            </div>
                            <div className="product-card">
                                <h3>Medicare Gown</h3>
                                <p>Surgical Gowns</p>
                                <p>Available in multiple sizes (Medium, Large, XL, XXL)</p>
                            </div>
                            <div className="product-card">
                                <h3>Alco Swab</h3>
                                <p>Alcohol Swab 70% Isopropyl Alcohol</p>
                                <p>Standard Size: 3cmx3cm, 6cmx6cm, 10cm x 10cm</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Partnership Section --> */}
                <section className="partnership">
                    <div className="partnership-content">
                        <h2>Become a Distributor</h2>
                        <p>
                            Join our network of distributors and bring Karim Industries' quality
                            surgical dressing products to your market. We offer competitive
                            terms and comprehensive support to our distribution partners.
                        </p>
                        <div className="partnership-features">
                            <div className="feature-item">
                                <i className="fas fa-tags"></i>
                                <p>Competitive pricing</p>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-shipping-fast"></i>
                                <p>Reliable delivery</p>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-chart-line"></i>
                                <p>Sales support</p>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-certificate"></i>
                                <p>Marketing materials</p>
                            </div>
                        </div>
                        <a href="." className="partner-button">Request Distributor Information</a>
                    </div>
                    <div className="partnership-image"></div>
                </section>
            </main>
        </div>
    )
}

export default DistributerCollabration;