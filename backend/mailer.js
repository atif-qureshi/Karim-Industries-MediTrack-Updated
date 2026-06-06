const nodemailer = require('nodemailer');

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransporter() {
  if (isSmtpConfigured()) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback no-op transporter to avoid breaking when SMTP not configured
  return {
    async verify() { return true; },
    async sendMail(opts) {
      console.warn('SMTP not configured - sendMail called with:', opts && opts.subject);
      return { accepted: [], rejected: [] };
    }
  };
}

function getMailRecipient() {
  return process.env.MAIL_RECIPIENT || process.env.SMTP_USER || 'no-reply@karimindustries.com.pk';
}

async function sendContactEmail({ transporter, ...mailOptions }) {
  const t = transporter || createTransporter();
  return t.sendMail(mailOptions);
}

async function sendEmail({ transporter, ...mailOptions }) {
  const t = transporter || createTransporter();
  return t.sendMail(mailOptions);
}

module.exports = {
  isSmtpConfigured,
  createTransporter,
  getMailRecipient,
  sendContactEmail,
  sendEmail,
};
