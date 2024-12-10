import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
  user: 'ae529a35d20a1d', // Replace with your credentials
  password: '68af7714ca75bb',
  host: 'smtp.mailtrap.io',
  port: 587,
  ssl: false,
  debug: true,
});

client.send({
  text: 'Test email content',
  from: 'Your Name <your-email@example.com>',
  to: 'Recipient <recipient@example.com>',
  subject: 'SMTP Test',
}, (err, message) => {
  if (err) {
    console.error('Email sending error:', err);
  } else {
    console.log('Email sent successfully:', message);
  }
});
