import nodemailer from 'nodemailer';

// Create mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false, // Use TLS for port 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Mail service error:', error);
  } else {
    console.log('✅ Mail service ready');
  }
});

export default transporter;
