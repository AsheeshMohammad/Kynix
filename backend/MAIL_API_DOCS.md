# Email/Mail API Documentation

## Overview

The Mail API allows you to send emails from your frontend to info@kynix.co.in. Two endpoints are provided:

1. **`POST /api/mail/send`** — Generic email sending
2. **`POST /api/mail/contact`** — Contact form submission

## Setup

### 1. Install Nodemailer

```bash
cd backend
npm install nodemailer
```

### 2. Configure Email Settings in `.env`

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@kynix.co.in
MAIL_TO=info@kynix.co.in
```

### 3. Gmail Setup (for SMTP)

If using Gmail:

1. Enable **2-Step Verification** in your Google Account
2. Generate an **App Password** (not your regular password):
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
3. Use this app password in `MAIL_PASSWORD`

Alternatively, use SendGrid, Mailgun, or any SMTP service.

---

## API Endpoints

### 1. Send Generic Email

**Endpoint:** `POST /api/mail/send`

**Request Body:**
```json
{
  "subject": "Subject of the email",
  "message": "The email message content",
  "senderName": "John Doe",
  "senderEmail": "user@example.com"
}
```

**Required Fields:**
- `subject` (string) — Email subject
- `message` (string) — Email message/content
- `senderEmail` (string) — Sender's email address

**Optional Fields:**
- `senderName` (string) — Name of sender

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "<unique-message-id>",
  "timestamp": "2025-11-14T10:30:00.000Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to send email",
  "error": "Error details..."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/mail/send \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Test Email",
    "message": "This is a test message",
    "senderName": "John",
    "senderEmail": "john@example.com"
  }'
```

---

### 2. Send Contact Form Email

**Endpoint:** `POST /api/mail/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-234-567-8900",
  "subject": "Website Inquiry",
  "message": "I have a question about your services..."
}
```

**Required Fields:**
- `name` (string) — Sender's name
- `email` (string) — Sender's email address
- `message` (string) — Message content

**Optional Fields:**
- `phone` (string) — Sender's phone number
- `subject` (string) — Inquiry subject

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully.",
  "messageId": "<unique-message-id>",
  "timestamp": "2025-11-14T10:30:00.000Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/mail/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-987-654-3210",
    "subject": "Partnership Inquiry",
    "message": "I am interested in partnering with Kynix..."
  }'
```

---

## Frontend Integration (React)

### Using Fetch API

```javascript
// Generic email sending
async function sendEmail(subject, message, senderName, senderEmail) {
  try {
    const response = await fetch('http://localhost:3001/api/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        message,
        senderName,
        senderEmail
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Email sent successfully!');
      console.log('Message ID:', data.messageId);
    } else {
      alert('Failed to send email: ' + data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Error sending email: ' + error.message);
  }
}

// Contact form submission
async function submitContactForm(name, email, phone, subject, message) {
  try {
    const response = await fetch('http://localhost:3001/api/mail/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert(data.message); // "Thank you! Your message has been sent successfully."
    } else {
      alert('Failed to submit form: ' + data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form: ' + error.message);
  }
}
```

### React Component Example

```jsx
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Testing

### Using Postman

1. **Create a new POST request**
2. **URL:** `http://localhost:3001/api/mail/contact`
3. **Headers:**
   ```
   Content-Type: application/json
   ```
4. **Body (raw JSON):**
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "phone": "+1-555-0123",
     "subject": "Test Inquiry",
     "message": "This is a test message from Postman."
   }
   ```
5. **Click Send**

---

## Email Format

The emails sent by the API are professionally formatted with:

- ✅ HTML and plain text versions
- ✅ Styled email layout with gradient colors
- ✅ Reply-to functionality
- ✅ Timestamp and metadata
- ✅ Mobile-responsive design

### Example Email Output

```
From: noreply@kynix.co.in
To: info@kynix.co.in
Subject: Contact Form Submission: Partnership Inquiry

New Contact Form Submission

Name: Jane Smith
Email: jane@example.com
Phone: +1-987-654-3210
Subject: Partnership Inquiry

Message:
I am interested in partnering with Kynix for a new project...

---
Submitted: 2025-11-14, 3:30 PM
```

---

## Logging

All emails sent are logged in the database with:
- `action`: `EMAIL_SENT` or `CONTACT_FORM_SUBMITTED`
- `details`: Sender info
- `ipAddress`: Sender's IP
- `userAgent`: Browser info
- `createdAt`: Timestamp

View logs via: `GET /api/logs`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Mail service not ready** | Check email credentials in `.env` |
| **SMTP connection failed** | Verify MAIL_HOST and MAIL_PORT |
| **Gmail authentication error** | Use app-specific password, not regular password |
| **Email not received** | Check spam folder, verify recipient email |
| **Port 587 blocked** | Try port 465 (SSL) or use different SMTP provider |

---

## Alternative Email Providers

### SendGrid
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=apikey
MAIL_PASSWORD=SG.xxx_your_api_key_xxx
```

### Mailgun
```env
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USER=postmaster@your-domain.com
MAIL_PASSWORD=your_mailgun_password
```

### AWS SES
```env
MAIL_HOST=email-smtp.region.amazonaws.com
MAIL_PORT=587
MAIL_USER=your_smtp_username
MAIL_PASSWORD=your_smtp_password
```

---

## Security Notes

- ✅ Emails are sent without authentication required (public endpoint)
- ✅ Rate limiting applies to all requests
- ✅ Input validation on all fields
- ✅ Sender email is used as reply-to address
- ⚠️ Consider adding CAPTCHA for production contact forms

---

**API ready! Start sending emails from your frontend. 🚀**
