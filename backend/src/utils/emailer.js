import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
    user: 'infobrinkgaming@gmail.com',
    password: 'Westernkelly',
    host: 'smtp.gmail.com',
    ssl: 'true',
});

export const sendEmail = async (to, subject, message) => {
    try {
        await client.sendAsync({
            text: message,
            from: 'Spear Wallet <infobrinkgaming@gmail.com>',
            to,
            subject,
        });
        console.log(`Email sent to ${to}`);
    }catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Could ot send email');
    }
};