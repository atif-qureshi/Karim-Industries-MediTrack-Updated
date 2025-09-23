import React, { useState } from 'react';
import './ContactUs.css';
import {
    FaMapMarkerAlt,
    FaBuilding,
    FaLink,
    FaEnvelope,
    FaGlobe,
    FaPhone,
    FaUserTie,
    FaPaperPlane,
} from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ✅ FormSubmit ke through email bhejna
    const handleFormSubmit = (e) => {
        e.preventDefault(); // page reload na ho

        const form = e.target;

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
        })
            .then(() => {
                setIsSubmitted(true); // success message show
                form.reset(); // form clear
                setTimeout(() => setIsSubmitted(false), 4000); // 4 sec baad hide
            })
            .catch((err) => console.error("Form submit error:", err));
    };

    return (
        <div className="contact-container">
            <div className="products-heading">
                <h1>Contact Karim Industries</h1>
                <p>Get in touch with Pakistan's leading surgical dressing manufacturer</p>
            </div>

            <div className="contact-content">
                {/* Contact Info */}
                <div className="contact-info">
                    <div className="info-section">
                        <h2><FaMapMarkerAlt className="icon" /> Factory Address</h2>
                        <p>½ Km Raiwind Road, Raiwind<br />Lahore-Pakistan</p>
                        <p><FaPhone className="icon" /> +92-42-35392174</p>
                    </div>
                    <div className="info-section">
                        <h2><FaBuilding className="icon" /> Head Office</h2>
                        <p>135-C Nawab Town, Thokar Niaz Baig<br />Lahore-Pakistan</p>
                        <p><FaPhone className="icon" /> +92-42-35233001</p>
                        <p><FaPhone className="icon" /> +92-300-4090248</p>
                    </div>
                    <div className="info-section">
                        <h2><FaLink className="icon" /> Online Contacts</h2>
                        <p><FaEnvelope className="icon" /> info@karimindustries.com.pk</p>
                        <p><FaEnvelope className="icon" /> karimindustries786@gmail.com</p>
                    </div>
                    <div className="info-section">
                        <h2><FaUserTie className="icon" /> Liason Office</h2>
                        <p>Ch. Imam Din Medicine Market, 2nd Floor, Room No. 12<br />
                            outside Lohari Gate Lahore-Pakistan</p>
                        <p><FaPhone className="icon" /> +92-42-37249148</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    {isSubmitted ? (
                        <div className="success-message">
                            <FiCheckCircle className="success-icon" />
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll contact you soon.</p>
                        </div>
                    ) : (
                        <form
                            action="https://formsubmit.co/muhammadatifqureshi30@gmail.com"
                            method="POST"
                            onSubmit={handleFormSubmit}
                        >
                            {/* FormSubmit options */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input
                                type="hidden"
                                name="_next"
                                value={window.location.href + "?submitted=true"}
                            />

                            <div className="form-group">
                                <label htmlFor="name">Name*</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Select Your Country*</label>
                                <select id="country" name="country" required>
                                    <option value="">Select Country</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="UAE">UAE</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Name of Company/Hospital/other*</label>
                                <input type="text" id="company" name="company" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone/Contact no*</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5"></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                <FaPaperPlane className="submit-icon" /> Send
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Factory Location */}
            <div className="locations-container">
                <div className="map-box">
                    <h2 className="text-lg font-semibold mb-2">Factory Location</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.439797335876!2d74.24346357450531!3d31.457085950267963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901b65ed5e5cd%3A0x4815455ee7804be9!2sKarim%20industries!5e0!3m2!1sen!2s!4v1756295167968!5m2!1sen!2s"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Factory Location"
                    ></iframe>
                </div>
            </div>

            {/* Office Location */}
            <div className="map-box">
                <h2 className="text-lg font-semibold mb-2">Office Location</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3403.439984903642!2d74.2440916965424!3d31.457080788792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919018bec51fab1%3A0x57d73c073b240d3d!2s135%2FC%20Nawab%20Town%20Rd%2C%20Block%20C%20Nawab%20Town%2C%20Lahore%2C%2054000!5e0!3m2!1sen!2s!4v1756373496098!5m2!1sen!2s"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
