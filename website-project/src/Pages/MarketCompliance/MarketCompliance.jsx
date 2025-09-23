import React from 'react'
import './MarketCompliance.css';
const MarketCompliance = () => {
    return (
        <div>
            <main className="compliance-container">
                <div className="products-heading">
                    <h1>Market Compliance & Quality Standards</h1>
                    <p>
                        Karim Industries is committed to meeting the highest industry
                        standards for all our surgical dressing products
                    </p>
                </div>

                <section className="standards-section">
                    <div className="standards-intro">
                        <h2>Our Compliance Framework</h2>
                        <p>
                            We adhere to rigorous international standards to ensure the safety,
                            efficacy, and quality of our medical products.
                        </p>
                    </div>

                    <div className="standards-grid">
                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="fas fa-book-medical"></i>
                            </div>
                            <h3>BP / BPC Compliance</h3>
                            <p>
                                Our products meet the specifications of the British Pharmacopoeia
                                (BP) and British Pharmaceutical Codex (BPC) standards.
                            </p>
                            <ul className="compliance-list">
                                <li>Absorbent Cotton Wool (Medi Cot)</li>
                                <li>Cotton Crepe Bandage (Medi Crepe)</li>
                                <li>Plaster of Paris Bandage (Medi Plast)</li>
                                <li>Gauze Swab (Soft Gauze)</li>
                                <li>Lint Gauze (Medi Lint Gauze)</li>
                            </ul>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="fas fa-flag-usa"></i>
                            </div>
                            <h3>USP Standards</h3>
                            <p>
                                Selected products comply with the United States Pharmacopeia (USP)
                                requirements for quality and purity.
                            </p>
                            <ul className="compliance-list">
                                <li>Gauze Swab USP-IV (Me Soft Gauze)</li>
                                <li>Povidone-Iodine Povee-Tulle</li>
                                <li>Silver Sulfadiazine (Silva Tulle)</li>
                            </ul>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="fas fa-clipboard-check"></i>
                            </div>
                            <h3>Quality Assurance</h3>
                            <p>
                                Our comprehensive quality control processes ensure product
                                consistency and reliability.
                            </p>
                            <ul className="compliance-list">
                                <li>100% bleached cotton with no optical brightening agents</li>
                                <li>Chemical inert materials</li>
                                <li>Sterilization before use (where applicable)</li>
                                <li>X-Ray detectable options available</li>
                            </ul>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="fas fa-industry"></i>
                            </div>
                            <h3>Manufacturing Standards</h3>
                            <p>
                                Our production facilities follow strict protocols to maintain
                                product integrity.
                            </p>
                            <ul className="compliance-list">
                                <li>Sterile and non-sterile options</li>
                                <li>Individually wrapped products</li>
                                <li>Pre-washed materials</li>
                                <li>Folded edges to minimize lint</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2>Key Quality Features Across Our Product Range</h2>
                    <div className="features-grid">
                        <div className="feature-box">
                            <i className="fas fa-bacterium"></i>
                            <h3>Sterility Assurance</h3>
                            <p>
                                Products are sterile before use, ensuring safety in medical
                                applications.
                            </p>
                        </div>
                        <div className="feature-box">
                            <i className="fas fa-allergies"></i>
                            <h3>Hypoallergenic</h3>
                            <p>
                                Non-irritating materials safe for all skin types, including
                                sensitive skin.
                            </p>
                        </div>
                        <div className="feature-box">
                            <i className="fas fa-tint"></i>
                            <h3>Absorbency</h3>
                            <p>High absorbency for exudates, blood, and body fluids.</p>
                        </div>
                        <div className="feature-box">
                            <i className="fas fa-x-ray"></i>
                            <h3>X-Ray Detectable</h3>
                            <p>
                                Options available with X-Ray detectable threads for surgical
                                safety.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="certifications-section">
                    <h2>Our Participation in Health Exhibitions</h2>
                    <p>
                        We actively participate in industry events to stay current with global
                        standards:
                    </p>
                    <div className="certifications-grid">
                        <div className="certification-item">
                            <div className="certification-badge">
                                <i className="fas fa-medal"></i>
                            </div>
                            <h3>PHARMA ASIA EXPO</h3>
                            <p>2020-2021</p>
                        </div>
                        <div className="certification-item">
                            <div className="certification-badge">
                                <i className="fas fa-certificate"></i>
                            </div>
                            <h3>PAK MEDICA EXPO</h3>
                            <p>2021-2022</p>
                        </div>
                    </div>
                </section>

                <section className="commitment-section">
                    <div className="commitment-content">
                        <h2>Our Quality Commitment</h2>
                        <p>
                            At Karim Industries, we understand that medical products must meet
                            the highest standards of quality and safety. Our compliance with
                            international pharmacopoeial standards ensures that healthcare
                            providers can trust our products for patient care.
                        </p>
                        <p>
                            We continuously monitor and update our processes to align with
                            evolving global standards and customer expectations.
                        </p>
                        <div className="commitment-stats">
                            <div className="stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Bleached Cotton</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">0%</span>
                                <span className="stat-label">Optical Brighteners</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">Multiple</span>
                                <span className="stat-label">Standard Compliance</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default MarketCompliance;
