import { SMTPClient } from 'emailjs';

// Function to generate a random OTP
export const generateOtp = (length = 6) => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Function to send the OTP email
export const sendOtpEmail = (email, otp) => {
  const client = new SMTPClient({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    ssl: false, // Set to true if using secure connection
  });

  client.send({
    text: `Your OTP code is ${otp}`,
    from: 'Brink Gaming infobrinkgaming@gmail.com',
    to: email,
    subject: 'Your OTP Code',
  }, (err, message) => {
    if (err) {
      console.error('Error sending OTP:', err);
    } else {
      console.log('OTP sent successfully:', message);
    }
  });
};