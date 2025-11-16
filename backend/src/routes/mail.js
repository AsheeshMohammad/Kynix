import express from 'express';
import { sendMail, sendContactMail } from '../controllers/mailController.js';

const router = express.Router();

/**
 * @swagger
 * /api/mail/send:
 *   post:
 *     summary: Send email with custom subject and message
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - message
 *               - senderEmail
 *             properties:
 *               subject: { type: string, description: "Email subject" }
 *               message: { type: string, description: "Email message/content" }
 *               senderName: { type: string, description: "Name of sender (optional)" }
 *               senderEmail: { type: string, description: "Sender's email address" }
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to send email
 */
router.post('/send', sendMail);

/**
 * @swagger
 * /api/mail/contact:
 *   post:
 *     summary: Send contact form email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name: { type: string, description: "Sender's name" }
 *               email: { type: string, description: "Sender's email" }
 *               phone: { type: string, description: "Sender's phone (optional)" }
 *               subject: { type: string, description: "Inquiry subject (optional)" }
 *               message: { type: string, description: "Message content" }
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to submit contact form
 */
router.post('/contact', sendContactMail);

export default router;
