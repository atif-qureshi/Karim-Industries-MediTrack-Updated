import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <main className="service-page">
            <section className="hero-section">
                <h1>Our Services</h1>
                <p>Comprehensive healthcare solutions tailored to your needs</p>
            </section>

            <section className="services-overview">
                <div className="service-card">
                    <div className="service-icon">🩺</div>
                    <h3>Medical Manufacturing</h3>
                    <p>High-quality production of surgical dressings and medical supplies meeting international standards.</p>
                </div>

                <div className="service-card">
                    <div className="service-icon">🏭</div>
                    <h3>Custom Production</h3>
                    <p>Tailored manufacturing solutions to meet specific customer requirements and specifications.</p>
                </div>

                <div className="service-card">
                    <div className="service-icon">🌐</div>
                    <h3>Global Distribution</h3>
                    <p>Efficient worldwide logistics network ensuring timely delivery of medical products.</p>
                </div>

                <div className="service-card">
                    <div className="service-icon">🔬</div>
                    <h3>Quality Assurance</h3>
                    <p>Rigorous testing and compliance with BP, BPC, and USP standards for all products.</p>
                </div>
            </section>

            <section className="commitment-section">
                <h2>Our Commitment</h2>
                <div className="commitment-grid">
                    <div className="commitment-item">
                        <h3>Quality</h3>
                        <p>Every product meets strict international medical standards.</p>
                    </div>
                    <div className="commitment-item">
                        <h3>Innovation</h3>
                        <p>Continuous improvement in manufacturing processes.</p>
                    </div>
                    <div className="commitment-item">
                        <h3>Sustainability</h3>
                        <p>Environmentally responsible production practices.</p>
                    </div>
                    <div className="commitment-item">
                        <h3>Support</h3>
                        <p>Dedicated customer service for all your needs.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Services;