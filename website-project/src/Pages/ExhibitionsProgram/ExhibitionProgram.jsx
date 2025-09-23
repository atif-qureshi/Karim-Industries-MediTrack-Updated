import React from 'react'
import './ExhibitionProgram.css';
const ExhibitionProgram = () => {
    return (
        <div>
            <main className="trade-show-container">
                {/* Heading Section */}
                <div className="products-heading">
                    <h1>Exhibition Program</h1>
                    <p>
                        Connecting with healthcare professionals and showcasing our surgical
                        dressing innovations
                    </p>
                </div>

                {/* <!-- Introduction Section --> */}
                <section className="participation-intro">
                    <h2>Our Trade Show Presence</h2>
                    <p>
                        Karim Industries actively participates in leading medical trade shows
                        to demonstrate our commitment to quality and innovation in surgical
                        dressing manufacturing. These events allow us to present our full
                        range of BP, BPC, and USP compliant products to healthcare
                        professionals worldwide.
                    </p>
                </section>

                {/* <!-- Past Events Section --> */}
                <section className="past-events">
                    <h2>Recent Trade Show Participation</h2>
                    <div className="event-cards">

                        {/* Event Card 1 */}
                        <article className="event-card">
                            <div
                                className="event-image"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 86, 179, 0.7), rgba(0, 86, 179, 0.7)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                                }}
                            >
                                <h3>PHARMA ASIA EXPO</h3>
                                <p className="event-year">2020-2021</p>
                            </div>
                            <div className="event-details">
                                <p>
                                    Showcased our Medi Cot absorbent cotton wool and Medi Crepe bandages to international buyers and distributors.
                                </p>
                                <ul className="event-highlights">
                                    <li>Featured our BP/BPC compliant product line</li>
                                    <li>Demonstrated quality manufacturing processes</li>
                                    <li>Established connections with 50+ potential clients</li>
                                </ul>
                            </div>
                        </article>

                        {/* Event Card 2 */}
                        <article className="event-card">
                            <div
                                className="event-image"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 86, 179, 0.7), rgba(0, 86, 179, 0.7)), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                                }}
                            >
                                <h3>PAK MEDICA EXPO</h3>
                                <p className="event-year">2021-2022</p>
                            </div>
                            <div className="event-details">
                                <p>
                                    Introduced our advanced wound care products including Silva Tulle and Fustin Tulle dressings to the Pakistani market.
                                </p>
                                <ul className="event-highlights">
                                    <li>Launched our USP-compliant product range</li>
                                    <li>Demonstrated X-Ray detectable surgical products</li>
                                    <li>Received industry recognition for quality standards</li>
                                </ul>
                            </div>
                        </article>

                    </div>
                </section>


                {/* <!-- Featured Products Section --> */}
                <section className="featured-products">
                    <h2>Products Showcased at Trade Shows</h2>
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-icon">
                                <i className="fas fa-band-aid"></i>
                            </div>
                            <h3>Absorbent Cotton</h3>
                            <p>
                                Medi Cot, Medi Balls, and Medi Zig Zag cotton products that comply
                                with BP/BPC standards.
                            </p>
                        </div>
                        <div className="product-card">
                            <div className="product-icon">
                                <i className="fas fa-burn"></i>
                            </div>
                            <h3>Wound Care Dressings</h3>
                            <p>
                                Specialized products like Medi Paraffin, Silva Tulle, and Fustin
                                Tulle for advanced wound management.
                            </p>
                        </div>
                        <div className="product-card">
                            <div className="product-icon">
                                <i className="fas fa-procedures"></i>
                            </div>
                            <h3>Surgical Supplies</h3>
                            <p>
                                Medicare Drape Kits, Surgical Gowns, and Alco Swabs for operating
                                room requirements.
                            </p>
                        </div>
                    </div>
                </section>

                {/* <!-- Upcoming Events Section --> */}
                <section className="upcoming-events">
                    <h2>Upcoming Trade Shows</h2>
                    <div className="upcoming-event-card">
                        <h3>MEDICAL ASIA 2023</h3>
                        <p className="event-date">November 15-17, 2023 | Karachi Expo Center</p>
                        <p>
                            We will be exhibiting our latest innovations including our new Alco
                            Swab 70% Isopropyl Alcohol products and enhanced Surgi Grip adhesive
                            tapes.
                        </p>
                        <div className="event-info">
                            <p>
                                <i className="fas fa-map-marker-alt"></i>
                                <strong>Location:</strong> Hall 3, Stand B-24
                            </p>
                            <p>
                                <i className="fas fa-box-open"></i>
                                <strong>Featured Products:</strong> All BP/BPC and USP compliant
                                surgical dressings
                            </p>
                        </div>
                    </div>
                </section>

                {/* <!-- Benefits Section --> */}
                <section className="benefits">
                    <h2>Why We Participate in Trade Shows</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <h3>Global Reach</h3>
                            <p>
                                Connect with international buyers and expand our market presence
                                across borders.
                            </p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3>Innovation Showcase</h3>
                            <p>
                                Demonstrate our latest product developments and technological
                                advancements.
                            </p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-handshake"></i>
                            </div>
                            <h3>Partnerships</h3>
                            <p>
                                Establish valuable relationships with distributors and healthcare
                                providers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* <!-- Contact Section --> */}
                <section className="trade-show-contact">
                    <h2>Meet Us at Our Next Trade Show</h2>
                    <p>
                        Interested in meeting with our team at an upcoming event or learning
                        more about our trade show participation?
                    </p>
                    <a href="/ContactUs" className="contact-button">Contact Our Team</a>
                </section>
            </main>
        </div>
    )
}

export default ExhibitionProgram;
