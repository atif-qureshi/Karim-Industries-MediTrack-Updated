import React from 'react';
import './LogisticManagement.css';
import Cotton from './Images/Cotton Wool.jpg';
import Soft from './Images/Me Soft Guaze.jpg';
import Povee from './Images/Povee Tulle.jpg';
import Trangular from './Images/Triangular White.jpg';

const LogisticManagement = () => {
    return (
        <div>
            <main className="logistics-container">
                <div className="products-heading">
                    <h1>Efficient Logistics Management</h1>
                    <p>
                        Reliable supply chain solutions for our surgical dressing products
                        worldwide
                    </p>
                </div>

                <section className="logistics-overview">
                    <h2>Our Logistics Capabilities</h2>
                    <div className="overview-grid">
                        <div className="overview-card">
                            <div className="icon-container">
                                <i className="fas fa-truck"></i>
                            </div>
                            <h3>Domestic Distribution</h3>
                            <p>
                                Nationwide network covering all major hospitals, pharmacies, and
                                medical suppliers across Pakistan
                            </p>
                        </div>
                        <div className="overview-card">
                            <div className="icon-container">
                                <i className="fas fa-ship"></i>
                            </div>
                            <h3>International Shipping</h3>
                            <p>
                                Export to 50+ countries via air, sea, and land with trusted global
                                logistics partners
                            </p>
                        </div>
                        <div className="overview-card">
                            <div className="icon-container">
                                <i className="fas fa-warehouse"></i>
                            </div>
                            <h3>Warehousing</h3>
                            <p>
                                15,000 sq ft climate-controlled storage at our Raiwind facility
                                with inventory management
                            </p>
                        </div>
                        <div className="overview-card">
                            <div className="icon-container">
                                <i className="fas fa-box-open"></i>
                            </div>
                            <h3>Custom Packaging</h3>
                            <p>
                                Tailored packaging solutions for different product categories and
                                destination requirements
                            </p>
                        </div>
                    </div>
                </section>

                <section className="product-logistics">
                    <h2>Product-Specific Logistics</h2>
                    <div className="product-grid">
                        <div className="product-card">
                            <img
                                src={Cotton}
                                alt="Cotton Products"
                            />
                            <h3>Cotton Products Logistics</h3>
                            <ul>
                                <li>
                                    <strong>Medi Cot:</strong> Bulk packaging (25kg bales) with
                                    moisture control
                                </li>
                                <li>
                                    <strong>Medi Balls:</strong> Sterile blister packs in cartons
                                    (1000 units/box)
                                </li>
                                <li>
                                    <strong>Ortho Cot:</strong> Roll packaging with protective outer
                                    covering
                                </li>
                                <li>
                                    Special temperature-controlled transport for sterile items
                                </li>
                            </ul>
                        </div>
                        <div className="product-card">
                            <img
                                src={Trangular}
                                alt="Bandages"
                            />
                            <h3>Bandages Logistics</h3>
                            <ul>
                                <li>
                                    <strong>Medi Crepe:</strong> Individually wrapped rolls in
                                    master cartons
                                </li>
                                <li>
                                    <strong>Medi Plast:</strong> POP bandages in moisture-proof
                                    packaging
                                </li>
                                <li>
                                    <strong>Triangular Bandages:</strong> Compact folding for
                                    efficient shipping
                                </li>
                                <li>Stackable packaging to maximize container space</li>
                            </ul>
                        </div>
                        <div className="product-card">
                            <img
                                src={Soft}
                                alt="Gauze Products"
                            />
                            <h3>Gauze Products Logistics</h3>
                            <ul>
                                <li>
                                    <strong>Soft Gauze:</strong> Sterile/non-sterile options with
                                    clear labeling
                                </li>
                                <li>
                                    <strong>USP-IV Gauze:</strong> Medical-grade packaging with lot
                                    tracking
                                </li>
                                <li>
                                    <strong>Lint Gauze:</strong> Compressed packaging to reduce
                                    volume
                                </li>
                                <li>X-ray detectable items marked for easy identification</li>
                            </ul>
                        </div>
                        <div className="product-card">
                            <img
                                src={Povee}
                                alt="Specialty Products"
                            />
                            <h3>Specialty Products Logistics</h3>
                            <ul>
                                <li>
                                    <strong>Medi Sofra Tulle:</strong> Temperature-sensitive
                                    shipping
                                </li>
                                <li>
                                    <strong>Paraffin Gauze:</strong> Leak-proof secondary packaging
                                </li>
                                <li>
                                    <strong>Fustin Tulle:</strong> Regulatory documentation included
                                </li>
                                <li>Customs-friendly labeling for international shipments</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="shipping-methods">
                    <h2>Shipping Methods</h2>
                    <div className="methods-container">
                        <div className="method-card">
                            <div className="method-icon">
                                <i className="fas fa-plane"></i>
                            </div>
                            <h3>Air Freight</h3>
                            <p>
                                <strong>Best for:</strong> Urgent orders, small quantities,
                                high-value items
                            </p>
                            <p><strong>Transit Time:</strong> 3-7 days internationally</p>
                            <p>
                                <strong>Products:</strong> Sterile surgical dressings,
                                time-sensitive orders
                            </p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">
                                <i className="fas fa-ship"></i>
                            </div>
                            <h3>Sea Freight</h3>
                            <p>
                                <strong>Best for:</strong> Large orders, bulk shipments,
                                cost-sensitive
                            </p>
                            <p><strong>Transit Time:</strong> 20-45 days internationally</p>
                            <p>
                                <strong>Products:</strong> Cotton products, bandages, non-urgent
                                items
                            </p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">
                                <i className="fas fa-truck"></i>
                            </div>
                            <h3>Land Transport</h3>
                            <p>
                                <strong>Best for:</strong> Regional deliveries, Pakistan domestic
                            </p>
                            <p><strong>Transit Time:</strong> 1-3 days nationally</p>
                            <p>
                                <strong>Products:</strong> All product categories with regular
                                deliveries
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LogisticManagement;