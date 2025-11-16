import { Resend } from 'resend';

let resend = null;

const getResend = () => {
  if (!resend) {
    resend = new Resend('re_bG14zMEg_HCKxRFhymgs22adFJVSPurav');
    console.log('Resend client initialized');
  }
  return resend;
};

const sendEmail = async (options) => {
  try {
    const resendClient = getResend();
    if (!resendClient) {
      console.log('📧 Mock Email (No API Key):');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      return { messageId: 'mock-' + Date.now() };
    }
    
    const data = await resendClient.emails.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html
    });
    console.log('Resend response:', data);
    return { messageId: data.id || data.messageId || 'resend-' + Date.now() };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

const transporter = { sendMail: sendEmail };

export const sendMail = async (req, res) => {
  try {
    const { subject, message, senderName, senderEmail } = req.body;

    // Validation
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    if (!senderEmail) {
      return res.status(400).json({
        success: false,
        message: 'Sender email is required'
      });
    }

    // Email content
    const mailOptions = {
      from: 'onboarding@resend.dev',
      to: 'mohammadasheesh786@gmail.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Message from Kynix Website</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>From:</strong> ${senderName || 'Anonymous'}</p>
            <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #8A5CF6; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">
              ${message}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px;">
            This email was sent from the Kynix website contact form.<br>
            Timestamp: ${new Date().toISOString()}
          </p>
        </div>
      `,
      replyTo: senderEmail, // Reply directly to sender
      text: `
        New Message from Kynix Website

        From: ${senderName || 'Anonymous'}
        Email: ${senderEmail}
        Subject: ${subject}

        Message:
        ${message}

        ---
        This email was sent from the Kynix website contact form.
        Timestamp: ${new Date().toISOString()}
      `
    };

    // Send email
    console.log('Attempting to send email to:', mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent with ID:', info.messageId);



    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mail sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!email || !name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const mailOptions = {
      from: 'onboarding@resend.dev',
      to: 'mohammadasheesh786@gmail.com',
      subject: `Contact Form Submission: ${subject || 'New Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          </div>

          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #5CE0C6; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">
              ${message}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px;">
            Submitted: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      replyTo: email,
      text: `
        New Contact Form Submission

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Subject: ${subject || 'General Inquiry'}

        Message:
        ${message}

        ---
        Submitted: ${new Date().toLocaleString()}
      `
    };

    console.log('Attempting to send contact email to:', mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent with ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Contact mail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact form',
      error: error.message
    });
  }
};
