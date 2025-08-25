const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
    const { name, country, company, phone, email, message } = req.body;

    // Configure transporter (use your SMTP details)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another service
        auth: {
            user: 'hashmiqureshi715@gmail.com',
            pass: 'hdbxhfmqpoerxche'
        }
    });

    // Compose mail options
    const mailOptions = {
        from: email,
        to: 'hashmiqureshi715@gmail.com', // your receiving email
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <p><b>Name:</b> ${name}</p>
            <p><b>Country:</b> ${country}</p>
            <p><b>Company:</b> ${company}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

module.exports = router;