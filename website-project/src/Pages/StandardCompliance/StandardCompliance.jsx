import React from 'react'
import './StandardCompliance.css';
import Cert1 from './Certificates/Certificate-1.jpg';
import Cert2 from './Certificates/Certificate-2.jpg';
import Cert3 from './Certificates/Certificate-3.jpg';
import Cert4 from './Certificates/Certificate-4.jpg';
import Cert5 from './Certificates/Certificate-5.jpg';
const StandardCompliance = () => {
    return (
        <div>
            <main className="container">
                {/* Heading Section */}
                <div className="products-heading">
                    <h1>Standard Compliance</h1>
                    <p>Karim Industries is committed to manufacturing high-quality surgical
                        dressing products that meet international standards and
                        specifications.</p>
                </div>


                <section className="compliance-section">
                    <h2>Our Compliance Standards</h2>
                    <p>
                        All our products are manufactured in compliance with international
                        pharmacopoeia standards and quality requirements. We maintain strict
                        quality control measures throughout our production process to ensure
                        our products meet the highest standards of safety and efficacy.
                    </p>

                    <div className="standards-grid">
                        <div className="standard-card">
                            <h4>British Pharmacopoeia (BP)</h4>
                            <p>
                                Our products including Medi Cot, Medi Balls, Medi Crepe Bandage,
                                and others comply with the British Pharmacopoeia standards for
                                quality and performance.
                            </p>
                        </div>
                        <div className="standard-card">
                            <h4>British Pharmaceutical Codex (BPC)</h4>
                            <p>
                                Products like Medi Zig Zag Cotton, Medi Lint Gauze, and Medi Lap
                                Sponges adhere to BPC specifications for pharmaceutical quality.
                            </p>
                        </div>
                        <div className="standard-card">
                            <h4>United States Pharmacopeia (USP)</h4>
                            <p>
                                Our USP-IV Gauze Swab, Povee-Tulle, and Silva Tulle meet the
                                rigorous standards set by the United States Pharmacopeia.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="compliance-section">
                    <h2>Quality Features</h2>
                    <p>
                        Our manufacturing processes incorporate several quality features to
                        ensure product excellence:
                    </p>

                    <h3>Material Quality</h3>
                    <ul>
                        <li>
                            100% bleached absorbent cotton for products like Medi Cot and Medi
                            Balls
                        </li>
                        <li>
                            Chemical inert materials free of optical brightening agents (OBA)
                        </li>
                        <li>High-quality cotton yarns for bandages and gauze products</li>
                        <li>Hydrophilic cotton for products requiring absorption</li>
                    </ul>

                    <h3>Sterility Assurance</h3>
                    <ul>
                        <li>Sterile before use for critical products</li>
                        <li>Available in both sterile and non-sterile options as required</li>
                        <li>Individually wrapped packaging to maintain sterility</li>
                    </ul>

                    <h3>Product Specifications</h3>
                    <ul>
                        <li>Standard weights and sizes available for all products</li>
                        <li>Custom sizes available as per customer demand</li>
                        <li>X-ray detectable options for surgical products</li>
                    </ul>
                </section>

                <section className="compliance-section">
                    <h2>Our Product Range</h2>
                    <p>
                        Karim Industries manufactures a comprehensive range of surgical
                        dressing products, all meeting relevant standards:
                    </p>

                    <div className="product-list">
                        <ul>
                            <li>Absorbent Cotton Wool (Medi Cot)</li>
                            <li>Cotton Balls (Medi Balls)</li>
                            <li>Zig Zag Cotton (Medi Zig Zag)</li>
                            <li>Non Absorbent Cotton (Ortho Cot)</li>
                            <li>Cotton Crepe Bandage (Medi Crepe)</li>
                            <li>Plaster of Paris Bandage (Medi Plast)</li>
                            <li>Bandage Open Wove (Medi Band)</li>
                            <li>Triangular Bandage (Medi Triangular)</li>
                            <li>Gauze Swab (Soft Gauze)</li>
                        </ul>
                        <ul>
                            <li>Gauze Swab USP-IV (Me Soft Gauze)</li>
                            <li>Surgical Gauze Roll (Soft Gauze)</li>
                            <li>Lint Gauze (Medi Lint Gauze)</li>
                            <li>Lap Sponges (Medi Lap Sponges)</li>
                            <li>Framycetin Sulphate (Medi Sofra Tulle)</li>
                            <li>Chlorhexidine Tulle (Septi Grass Tulle)</li>
                            <li>Paraffin Gauze (Medi Paraffin)</li>
                            <li>Fusidic Acid (Fustin Tulle)</li>
                            <li>Gauze Eye Pad (Medi Eye Pad)</li>
                        </ul>
                    </div>
                </section>

                <section className="compliance-section">
                    <h2>Certifications & Approvals</h2>
                    <p>
                        Karim Industries maintains compliance with various international
                        standards and regulatory requirements:
                    </p>
                    <br /><br />
                    <div className="certifications">
                        <div className="certification-badge">
                            <img
                                src={Cert1}
                                alt="ISO Certification"
                            />
                        </div>
                        <div className="certification-badge">
                            <img
                                src={Cert2}
                                alt="BP Compliance"
                            />
                        </div>
                        <div className="certification-badge">
                            <img
                                src={Cert3}
                                alt="USP Approval"
                            />
                        </div>
                        <div className="certification-badge">
                            <img
                                src={Cert4}
                                alt="Good Manufacturing Practices"
                            />
                        </div>
                        <div className="certification-badge">
                            <img
                                src={Cert5}
                                alt="CE Certification"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default StandardCompliance;
