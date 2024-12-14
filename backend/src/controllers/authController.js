import { generateOtp, sendOtpEmail } from '../utils/emailer.js';

const userDatabase = {}; // Temporary storage for demo. Replace with a real database.
const otpStorage = {}; // Temporary OTP storage.

export const signup = async (req, res) => {
    console.log("Request Body:", req.body); // Debugging log

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOtp(); // Generate a new OTP
    otpStorage[email] = otp; // Store OTP temporarily
    console.log(`Generated OTP for ${email}: ${otp}`); // Debugging log

    try {
        await sendOtpEmail(email, otp); // Send OTP email
        return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error sending OTP:', error); // Debugging log
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
};

export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    console.log(`Verifying OTP for ${email}: Received ${otp}, Stored ${otpStorage[email]}`); // Debugging log

    // Validate OTP
    if (otpStorage[email] && otpStorage[email].toString() === otp.trim()) {
        delete otpStorage[email]; // Clear OTP once used
        userDatabase[email] = { email }; // Save user to "database"
        console.log(`Signup successful for ${email}`); // Debugging log
        return res.status(200).json({ message: 'Signup successful' });
    }

    console.log(`Invalid OTP for ${email}`); // Debugging log
    return res.status(401).json({ message: 'Invalid OTP' });
};