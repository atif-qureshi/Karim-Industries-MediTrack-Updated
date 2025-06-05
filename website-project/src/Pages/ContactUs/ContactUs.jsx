import React from 'react';
import './ContactUs.css';
import { FaMapMarkerAlt, FaBuilding, FaLink, FaEnvelope, FaGlobe, FaPhone, FaUserTie } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Karim Industries</h1>
                <p>Manufacturer of Surgical Dressing Products</p>
            </div>

            <div className="contact-content">
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
                        <p><FaGlobe className="icon" /> www.karimindustries.com.pk</p>
                    </div>

                    <div className="info-section">
                        <h2><FaUserTie className="icon" /> Liason Office</h2>
                        <p>Ch. Imam Din Medicine Market, 2nd Floor, Room No. 12<br />
                            outside Lohari Gate Lahore-Pakistan</p>
                        <p><FaPhone className="icon" /> +92-42-37249148</p>
                    </div>

                </div>

                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>  
            </div>

            <div className="map-container">
                <iframe
                    title="Karim Industries Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.715316096427!2d74.26326731510496!3d31.45902098138976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903d25bca5d0d%3A0x5f1a4b0c7b5d5b8f!2sKarim%20Industries!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;