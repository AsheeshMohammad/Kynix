import { Resend } from 'resend';

let resend = null;

const getResend = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

export const sendEmail = async ({ to, subject, html, from = 'onboarding@resend.dev' }) => {
  try {
    const resendClient = getResend();
    if (!resendClient) {
      return { success: false, error: 'Resend API key not configured' };
    }
    
    const data = await resendClient.emails.send({
      from,
      to,
      subject,
      html
    });
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};