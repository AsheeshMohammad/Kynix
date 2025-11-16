import { sendEmail } from '../utils/emailService.js';

export const sendContactEmail = async (req, res) => {
  try {
    const { to, subject, message, name, email } = req.body;

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const result = await sendEmail({
      to: to || process.env.MAIL_TO,
      subject: subject || 'New Contact Form Submission',
      html
    });

    if (result.success) {
      res.json({ success: true, message: 'Email sent successfully' });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sendWelcomeEmail = async (req, res) => {
  try {
    const { to } = req.body;

    const result = await sendEmail({
      to,
      subject: 'Welcome to Kynix!',
      html: '<p>Welcome! Thanks for joining <strong>Kynix</strong>!</p>'
    });

    if (result.success) {
      res.json({ success: true, message: 'Welcome email sent successfully' });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};