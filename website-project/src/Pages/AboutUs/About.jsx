import React from 'react'
import './About.css';
const AboutUs = () => {
    return (
        <div>
            <main className="about-page">
                {/* <!-- Hero Section --> */}
                <section className="about-hero">
                    <div className="hero-content">
                        <h1>Our Story</h1>
                        <p>Discover who we are and what drives us</p>
                    </div>
                </section>

                {/* <!-- Mission Section --> */}
                <section className="mission-section">
                    <div className="container">
                        <div className="mission-content">
                            <h2>Our Mission</h2>
                            <p>
                                We are committed to delivering exceptional products and services
                                that improve lives while maintaining the highest standards of
                                quality and integrity.
                            </p>
                            <div className="mission-stats">
                                <div className="stat-item">
                                    <span className="stat-number">15+</span>
                                    <span className="stat-label">Years in Business</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Happy Clients</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Team Members</span>
                                </div>
                            </div>
                        </div>
                        <div className="mission-image">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                alt="Our team working together"
                            />
                        </div>
                    </div>
                </section>

                {/* <!-- Values Section --> */}
                <section className="values-section">
                    <div className="container">
                        <h2>Our Core Values</h2>
                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon">
                                    <i className="fas fa-handshake"></i>
                                </div>
                                <h3>Integrity</h3>
                                <p>
                                    We believe in doing the right thing, even when no one is
                                    watching.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                                <h3>Innovation</h3>
                                <p>
                                    We constantly push boundaries to deliver cutting-edge solutions.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <h3>Collaboration</h3>
                                <p>
                                    We achieve more together by fostering teamwork and partnerships.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <h3>Passion</h3>
                                <p>We love what we do and it shows in our work and results.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Team Section --> */}
                <section className="team-section">
                    <div className="container">
                        <h2>Meet Our Leadership</h2>
                        <p className="team-subtitle">The brilliant minds behind our success</p>
                        <div className="team-grid">
                            <div className="team-member">
                                <div className="member-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                        alt="John Doe"
                                    />
                                </div>
                                <h3>John Doe</h3>
                                <p className="position">CEO & Founder</p>
                                <p className="bio">
                                    With over 20 years of industry experience, John leads our
                                    company with vision and dedication.
                                </p>
                                <div className="social-links">
                                    <a href="." className="social-icon" aria-label="LinkedIn">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            />
                                        </svg>
                                    </a>
                                    <a href="." className="social-icon" aria-label="Twitter">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="team-member">
                                <div className="member-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                        alt="Jane Smith"
                                    />
                                </div>
                                <h3>Jane Smith</h3>
                                <p className="position">Chief Operating Officer</p>
                                <p className="bio">
                                    Jane ensures our operations run smoothly and efficiently across
                                    all departments.
                                </p>
                                <div className="social-links">
                                    <a href="." className="social-icon" aria-label="LinkedIn">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            />
                                        </svg>
                                    </a>
                                    <a href="." className="social-icon" aria-label="Twitter">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="team-member">
                                <div className="member-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                        alt="Michael Johnson"
                                    />
                                </div>
                                <h3>Michael Johnson</h3>
                                <p className="position">Chief Technology Officer</p>
                                <p className="bio">
                                    Michael drives our technological innovation and digital
                                    transformation strategies.
                                </p>
                                <div className="social-links">
                                    <a href="." className="social-icon" aria-label="LinkedIn">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            />
                                        </svg>
                                    </a>
                                    <a href="." className="social-icon" aria-label="Twitter">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- History Section --> */}
                <section className="history-section">
                    <div className="container">
                        <h2>Our Journey</h2>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-year">2008</div>
                                <div className="timeline-content">
                                    <h3>Company Founded</h3>
                                    <p>
                                        Started in a small garage with just three employees and a big
                                        vision.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-year">2012</div>
                                <div className="timeline-content">
                                    <h3>First Major Client</h3>
                                    <p>
                                        Landed our first Fortune 500 client, marking our entry into
                                        the big leagues.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-year">2016</div>
                                <div className="timeline-content">
                                    <h3>International Expansion</h3>
                                    <p>
                                        Opened our first overseas office in London, beginning global
                                        operations.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-year">2020</div>
                                <div className="timeline-content">
                                    <h3>Digital Transformation</h3>
                                    <p>
                                        Successfully pivoted to fully digital services during the
                                        pandemic.
                                    </p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-year">2023</div>
                                <div className="timeline-content">
                                    <h3>Current Milestone</h3>
                                    <p>
                                        Serving over 500 clients worldwide with a team of 50+
                                        dedicated professionals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- CTA Section --> */}
                <section className="cta-section">
                    <div className="container">
                        <h2>Want to Join Our Team?</h2>
                        <p>
                            We're always looking for talented individuals to join our growing
                            family.
                        </p>
                        <a href="." className="cta-button">View Open Positions</a>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AboutUs;
