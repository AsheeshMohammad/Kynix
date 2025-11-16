import express from 'express';
import { sendContactEmail, sendWelcomeEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/contact', sendContactEmail);
router.post('/welcome', sendWelcomeEmail);

export default router;