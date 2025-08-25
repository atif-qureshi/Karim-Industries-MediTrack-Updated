import React, { useState } from 'react';
import './ContactUs.css';
import { FaMapMarkerAlt, FaBuilding, FaLink, FaEnvelope, FaGlobe, FaPhone, FaUserTie, FaPaperPlane } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        company: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                setIsLoading(false);

                setTimeout(() => {
                    setFormData({
                        name: '',
                        country: '',
                        company: '',
                        phone: '',
                        email: '',
                        message: ''
                    });
                    setIsSubmitted(false);
                }, 3000);
            } else {
                throw new Error(result.message || "Unknown error");
            }
        } catch (error) {
            alert('Failed to send message. Please try again later.');
            setIsLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Karim Industries</h1>
                <p>Get in touch with Pakistan's leading surgical dressing manufacturer</p>
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
                    {isSubmitted ? (
                        <div className="success-message">
                            <FiCheckCircle className="success-icon" />
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll contact you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Select Your Country*</label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                >
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
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone/Contact no*</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                <FaPaperPlane className="submit-icon" /> {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    )}
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

            <div className="business-hours">
                <h3>Business Hours</h3>
                <ul>
                    <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                    <li><strong>Saturday:</strong> 9:00 AM - 2:00 PM</li>
                    <li><strong>Sunday:</strong> Closed</li>
                </ul>
            </div>
        </div>
    );
};

export default ContactPage;