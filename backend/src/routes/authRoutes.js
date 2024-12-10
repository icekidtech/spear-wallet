import express from 'express';
import { signup, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

// Route for user signup, which triggers OTP generation and sending
router.post('/signup', signup);

// Route for OTP verification
router.post('/verify-otp', verifyOtp);

export default router;