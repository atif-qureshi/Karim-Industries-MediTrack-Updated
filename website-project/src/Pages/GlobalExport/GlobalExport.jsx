import React from 'react'
import './GlobalExport.css';
import Cotton from './images/Cotton Balls white.jpg';
import Soft from './images/Soft Guaze.JPG';
import Silva from './images/Silva Tulle.jpg';
import Bandage from './images/Cotton Crepe Bandage.jpg';

const GlobalExport = () => {
    return (
        <div>
            <main className="main">
                <main className="export-container">
                    <div className="products-heading">
                        <h1>Global Export Solutions</h1>
                        <p>
                            Trusted surgical dressing products delivered worldwide with
                            uncompromising quality standards
                        </p>
                    </div>

                    <section className="export-capabilities">
                        <h2>Our Export Capabilities</h2>
                        <div className="capabilities-grid">
                            <div className="capability-card">
                                <i className="fas fa-globe"></i>
                                <h3>Worldwide Shipping</h3>
                                <p>
                                    We export to over 50 countries across 6 continents with reliable
                                    logistics partners
                                </p>
                            </div>
                            <div className="capability-card">
                                <i className="fas fa-certificate"></i>
                                <h3>International Certifications</h3>
                                <p>
                                    BP, BPC, USP, WHO-GMP compliant products meeting global
                                    standards
                                </p>
                            </div>
                            <div className="capability-card">
                                <i className="fas fa-boxes"></i>
                                <h3>Custom Packaging</h3>
                                <p>
                                    Tailored packaging solutions to meet your country's specific
                                    requirements
                                </p>
                            </div>
                            <div className="capability-card">
                                <i className="fas fa-file-contract"></i>
                                <h3>Documentation Support</h3>
                                <p>
                                    Complete export documentation including certificates of analysis
                                    and origin
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="export-products">
                        <h2>Key Export Products</h2>
                        <div className="product-categories">
                            <div className="category-card">
                                <img
                                    src={Cotton}
                                    alt="Cotton Products" loading='lazy'
                                />
                                <h3>Cotton Products</h3>
                                <ul>
                                    <li>Absorbent Cotton Wool (Medi Cot)</li>
                                    <li>Cotton Balls (Medi Balls)</li>
                                    <li>Zig Zag Cotton (Medi Zig Zag)</li>
                                    <li>Non Absorbent Cotton (Ortho Cot)</li>
                                </ul>
                            </div>
                            <div className="category-card">
                                <img
                                    src={Bandage}
                                    alt="Bandages" loading='lazy'
                                />
                                <h3>Bandages</h3>
                                <ul>
                                    <li>Cotton Crepe Bandage (Medi Crepe)</li>
                                    <li>Plaster of Paris Bandage (Medi Plast)</li>
                                    <li>Bandage Open Wove (Medi Band)</li>
                                    <li>Triangular Bandage (Medi Triangular)</li>
                                </ul>
                            </div>
                            <div className="category-card">
                                <img
                                    src={Soft}
                                    alt="Gauze Products" loading='lazy'
                                />
                                <h3>Gauze Products</h3>
                                <ul>
                                    <li>Gauze Swab (Soft Gauze)</li>
                                    <li>Gauze Swab USP-IV</li>
                                    <li>Surgical Gauze Roll</li>
                                    <li>Lint Gauze (Medi Lint Gauze)</li>
                                </ul>
                            </div>
                            <div className="category-card">
                                <img
                                    src={Silva}
                                    alt="Specialty Products" loading='lazy'
                                />
                                <h3>Specialty Products</h3>
                                <ul>
                                    <li>Framycetin Sulphate (Medi Sofra Tulle)</li>
                                    <li>Chlorhexidine Tulle (Septi Grass Tulle)</li>
                                    <li>Paraffin Gauze (Medi Paraffin)</li>
                                    <li>Fusidic Acid (Fustin Tulle)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="export-process">
                        <h2>Our Export Process</h2>
                        <div className="process-steps">
                            <div className="process-step">
                                <div className="step-number">1</div>
                                <h3>Inquiry & Quotation</h3>
                                <p>
                                    Receive detailed product specifications and competitive pricing
                                </p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">2</div>
                                <h3>Documentation</h3>
                                <p>We prepare all required export documents for your country</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">3</div>
                                <h3>Production</h3>
                                <p>Manufacturing begins with strict quality control checks</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">4</div>
                                <h3>Shipping</h3>
                                <p>Products shipped via your preferred logistics method</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">5</div>
                                <h3>Delivery</h3>
                                <p>
                                    Timely delivery with tracking until receipt at your facility
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </main>
        </div>
    )
}

export default GlobalExport
