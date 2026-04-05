import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import './WhatsAppButton.css';

const WhatsAppButton = () => (
    <a
        href="https://wa.me/923004090248"   // <- apna number (country code ke sath)
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-float"
    >
        <FaWhatsapp className="whatsapp-icon" />
    </a>
);

export default WhatsAppButton;
