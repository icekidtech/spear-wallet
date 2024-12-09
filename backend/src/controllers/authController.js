import { generateOtp, sendOtpEmail } from '../utils/emailer.js'; // Import necessary functions

const userDatabase = {}; // Temporary storage for demo. Replace with a real database.
const otpStorage = {}; // Temporary OTP storage.

export const signup = async (req, res) => {
    console.log("Request Body:", req.body); // Debugging log
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOtp();  // Use the new generateOtp function
    otpStorage[email] = otp;    // Store OTP temporarily

    try {
        await sendOtpEmail(email, otp);  // Send OTP email using sendOtpEmail function
        return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
};

export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Validate OTP
    if (otpStorage[email] === otp) {
        delete otpStorage[email]; // Clear OTP once used
        userDatabase[email] = { email }; // Save user to "database"
        return res.status(200).json({ message: 'Signup successful' });
    }

    return res.status(401).json({ message: 'Invalid OTP' });
};