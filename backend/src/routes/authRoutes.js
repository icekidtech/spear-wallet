import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Endpoint for user signup using email and OTP
router.post("/signup/email", async (req, res,) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Create user in the database with OTP (stored temporarily)
        await User.create({
            email,
            otp,
            isVerified: false,
        });

        res.status(200).json({ message: "OTP sent to your email." });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Verify OTP for user signup
router.post("/signup/verify", async (req, res) => {
    const { email, otp, } = req.body;
    try {
        const user = await User.findOne({ where: { email, otp } });
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = null; // Clear OTP after verification
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "User verified", token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Interneal Server Error" });
    }
});

// Google OAuth Signup
import password from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

passport.user(
    new GoogleStrategy(
        {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
        },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({ where: { email: profile.emails[0].value } });
                if (!user) {
                    user = await User.create({
                        email: profile.emails[0].value,
                        isVerified: true, // Automatically verified from Google signup
                    });
                }

                const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });

                done(null, {user, jwtToken });
            } catch (error) {
                done(error);
            }
        }
    )
);

router.get("/auth/google", passport.authentication("google", { scope: [email] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        req.redirect('http://localhost:3000?token=${req.user.jwtToken');
    }
);

export default router;