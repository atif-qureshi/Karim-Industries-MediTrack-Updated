import React from 'react';
import './About.css';
const AboutUs = () => {
    return (
        <main class="about-container">
            {/* <!-- Hero Section with Background Image --> */}
            <section class="about-hero">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1>About Karim Industries</h1>
                    <p class="tagline">Manufacturer of Premium Surgical Dressing Products</p>
                    <a href="#our-story" class="scroll-down">
                        <i class="fas fa-chevron-down"></i>
                    </a>
                </div>
            </section>

            {/* <!-- Our Story Section --> */}
            <section id="our-story" class="about-section">
                <div class="section-content">
                    <h2>Our Story</h2>
                    <div class="story-grid">
                        <div class="story-text">
                            <p>Founded with a vision to revolutionize wound care, Karim Industries has grown from a small workshop to a leading manufacturer of surgical dressing products. For over two decades, we've been committed to delivering high-quality medical supplies that meet international standards.</p>
                            <p>Our journey began in Lahore, Pakistan, with a simple mission: to provide healthcare professionals with reliable, affordable wound care solutions. Today, we serve hospitals, clinics, and medical institutions across the globe.</p>
                        </div>
                        <div class="story-image">
                            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Karim Industries Factory">
                            </img>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Products Section --> */}
            <section class="about-section product-section">
                <div class="section-content">
                    <h2>Our Products</h2>
                    <p>We specialize in a comprehensive range of surgical dressing products that comply with BP/BPC and USP specifications:</p>

                    <div class="product-grid">
                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-band-aid"></i>
                            </div>
                            <h3>Absorbent Cotton</h3>
                            <p>Medi Cot, Medi Balls, and Zig Zag Cotton products made from 100% bleached cotton.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-bone"></i>
                            </div>
                            <h3>Orthopedic Products</h3>
                            <p>Ortho Cot padding and Plaster of Paris Bandage for fracture management.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-bacteria"></i>
                            </div>
                            <h3>Antibacterial Dressings</h3>
                            <p>Fustin Tulle, Silva Tulle, and Povee-Tulle for infected wound care.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-procedures"></i>
                            </div>
                            <h3>Surgical Supplies</h3>
                            <p>Lap Sponges, Surgical Gowns, and Drape Kits for operating rooms.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Image Gallery Section --> */}
            <section class="gallery-section">
                <h2>Our Manufacturing Excellence</h2>
                <div class="gallery-container">
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Production Line">
                        </img>
                        <div class="gallery-overlay">
                            <p>Advanced Production Line</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Quality Control">
                        </img>
                        <div class="gallery-overlay">
                            <p>Stringent Quality Control</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Research & 
                        Development">
                        </img>
                        <div class="gallery-overlay">
                            <p>Research & Development</p>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Packaging">
                        </img>
                        <div class="gallery-overlay">
                            <p>Sterile Packaging</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Quality Commitment Section --> */}
            <section class="about-section quality-section">
                <div class="section-content">
                    <h2>Quality Commitment</h2>
                    <div class="quality-features">
                        <div class="quality-item">
                            <div class="quality-icon">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <h3>Standards Compliance</h3>
                            <p>Our products meet British Pharmacopoeia (BP), British Pharmaceutical Codex (BPC), and United States Pharmacopeia (USP) standards.</p>
                        </div>
                        <div class="quality-item">
                            <div class="quality-icon">
                                <i class="fas fa-sterling-sign"></i>
                            </div>
                            <h3>Sterility Assurance</h3>
                            <p>Critical products are sterile before use, with proper packaging to maintain integrity throughout distribution.</p>
                        </div>
                        <div class="quality-item">
                            <div class="quality-icon">
                                <i class="fas fa-flask"></i>
                            </div>
                            <h3>Material Quality</h3>
                            <p>We use 100% bleached cotton, chemical inert materials free from optical brightening agents.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
