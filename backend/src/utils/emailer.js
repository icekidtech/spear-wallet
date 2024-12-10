import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASS,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  ssl: false, // Set this to true if Mailtrap requires SSL
  // tls: true,  // Enables TLS if required
  tls: { ciphers: 'SSLv3' }, // Add this for TLS support
  debug: true, // Enable detailed logs
});

// Function to send emails
export const sendEmail = async (to, subject, text) => {
  try {
    await client.sendAsync({
      text,
      from: 'Your Name <demomailtrap.com>',
      to,
      subject,
    });
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};