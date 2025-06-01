import React from 'react'
import './Footer.css';

const Footer = () => {
    return (
        <div>
            <footer>
                {/* <!-- Quick Links Column --> */}
                <div className="footer-column">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="quick-links">
                        <li><a href="Home.html">Home</a></li>
                        <li><a href="About_Us.html">About Us</a></li>
                        <li><a href="1">Products</a></li>
                        <li><a href="2">Contact Us</a></li>
                    </ul>
                </div>

                {/* <!-- Address Column 1 --> */}
                <div className="footer-column">
                    <h3 className="footer-heading">Head Office</h3>
                    <div className="address-section">
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">
                                123 Tech Park, Silicon Valley, CA 94025, United States
                            </p>
                        </div>
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">+1 (555) 123-4567</p>
                        </div>
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">info@company.com</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Address Column 2 --> */}
                <div className="footer-column">
                    <h3 className="footer-heading">Regional Office</h3>
                    <div className="address-section">
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">
                                456 Business District, London EC1A 1AA, United Kingdom
                            </p>
                        </div>
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">+44 20 7946 0958</p>
                        </div>
                        <div className="address-item">
                            <span className="address-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                    />
                                </svg>
                            </span>
                            <p className="address-text">europe@company.com</p>
                        </div>
                    </div>
                </div>
                {/* <!-- Newsletter Column --> */}
                <div className="footer-column">
                    <h3 className="footer-heading">Newsletter</h3>
                    <div className="newsletter">
                        <p>
                            Subscribe to our newsletter to receive updates on new products,
                            special offers, and industry news.
                        </p>
                        <form className="subscribe-form">
                            <input
                                type="email"
                                className="email-input"
                                placeholder="Your email address"
                                required
                            />
                            <button type="submit" className="subscribe-btn">Subscribe</button>
                        </form>
                        <div className="social-media">
                            {/* <!-- Facebook --> */}
                            <a href="1" className="social-icon" aria-label="Facebook">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    />
                                </svg>
                            </a>

                            {/* <!-- Twitter --> */}
                            <a href="1" className="social-icon" aria-label="Twitter">
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

                            {/* <!-- Instagram --> */}
                            <a href="1" className="social-icon" aria-label="Instagram">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                                    />
                                </svg>
                            </a>

                            {/* <!-- LinkedIn --> */}
                            <a href="1" className="social-icon" aria-label="LinkedIn">
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

                            {/* <!-- YouTube --> */}
                            <a href="1" className="social-icon" aria-label="YouTube">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* <!-- Footer Bottom --> */}
                <div className="footer-bottom">
                    <p>
                        &copy; 2025 Karim Industries. All Rights Reserved. |
                        <a href="1">Privacy Policy</a> | <a href="1">Terms of Service</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
