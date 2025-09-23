import React from 'react';
import './About.css';
import image from './Images/Factory Building.jpg';
import MD from './Images/Mubashir Hussian.png';
import CEO from './Images/Hamid sb picture.jpg';

const AboutUs = () => {
    return (
        <main class="about-container">
            {/* <!-- Hero Section with Background Image --> */}
            <section class="about-hero">
                <img src={image} alt="Factory"/>
                <div class="hero-overlay"></div>
                <div class="hero-content">
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
                            <p>Founded with a vision to transform wound care, <strong>Karim Industries</strong> has grown from a modest workshop into a leading manufacturer and trusted name in the field of surgical dressing products. For more than two decades, we have been committed to delivering premium-quality medical supplies that meet and exceed international healthcare standards.</p>

                            <p>Our journey began in Lahore, Pakistan, with a clear mission: to provide healthcare professionals with reliable, affordable, and innovative wound care solutions. What started as a small initiative with limited resources has today expanded into a globally recognized company, serving hospitals, clinics, and medical institutions across continents.</p>

                            <p>At <strong>Karim Industries</strong>, we believe access to safe and effective medical products is a basic right. Guided by this belief, we invest in research, advanced manufacturing, and strict quality control to ensure every product meets the highest standards of safety and trust.</p>

                            <p>Looking ahead, we remain committed to innovation, sustainability, and expanding our reach—because at Karim Industries, healing begins with care.</p>
                        </div>
                        <div class="story-image">
                            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Karim Industries Factory" loading='lazy'>
                            </img>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Director/CEO Section --> */}
            <section class="director-section">
                <div class="section-content">
                    <div class="director-grid">
                        <div className="director-image">
                            <img src={CEO} alt="Company CEO" loading='lazy'/>
                        </div>

                        <div class="director-message">
                            <h2>Message from Our CEO</h2>
                            <blockquote>
                                "At Karim Industries, our vision is to continuously innovate and
                                set new benchmarks in the field of surgical dressings. As CEO, my
                                focus is to drive strategic growth, expand our global presence,
                                and ensure that our products reflect the highest standards of
                                quality and safety. Together, we aim to make a positive impact on
                                healthcare worldwide."
                            </blockquote>
                            <div class="director-info">
                                <h3>Mr. Hamid Bukhtiar</h3>
                                <p>CEO, Karim Industries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Managing Director */}
            <section class="director-section">
                <div class="section-content">
                    <div class="director-grid">
                        <div class="director-image">
                            <img src={MD} alt="Company Director" loading='lazy'/>
                        </div>
                        <div class="director-message">
                            <h2>Message from Our Managing Director</h2>
                            <blockquote>
                                "Operational excellence is at the heart of Karim Industries. As
                                Managing Director, my mission is to oversee daily operations,
                                maintain strict quality controls, and ensure timely delivery of
                                our products to healthcare providers. We are committed to building
                                trust through efficiency, reliability, and continuous improvement
                                in every process."
                            </blockquote>
                            <div class="director-info">
                                <h3>Mr. Mubashir Hussain</h3>
                                <p>Managing Director, Karim Industries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <h2 className="section-content">Discover Karim Industries</h2>
            <div className="video-section">
                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/a7UKUoVxAxo?si=HSV8nPYC1KdCve51"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen loading='lazy'>
                    </iframe>
                    <div className="video-caption"><h4>Our Services</h4></div>
                </div>

                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/V9lUW-S2kDA?si=Zq9czTgQnrOsIWMW"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen loading='lazy'>
                    </iframe>
                    <div className="video-caption"><h4>Company Overview</h4></div>
                </div>
            </div>

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

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-bandage"></i>
                            </div>
                            <h3>Bandages</h3>
                            <p>Open Wove Bandage, Triangular Bandage, and Cotton Crepe Bandage for wound care and support.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-stethoscope"></i>
                            </div>
                            <h3>Gauze Products</h3>
                            <p>Gauze Swabs, Surgical Gauze Rolls, and Lint Gauze for medical procedures and wound management.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-prescription-bottle"></i>
                            </div>
                            <h3>Medicated Dressings</h3>
                            <p>Paraffin Gauze and specialized tulle dressings for advanced wound care and treatment.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-tape"></i>
                            </div>
                            <h3>Tapes & Swabs</h3>
                            <p>Surgical Adhesive Tape and Alcohol Swabs for secure fastening and sterilization.</p>
                        </div>

                        <div class="product-card">
                            <div class="product-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <h3>Eye Care</h3>
                            <p>Gauze Eye Pads for ophthalmic procedures and eye protection.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
