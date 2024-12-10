# Spear Wallet - Backend

Spear Wallet is a decentralized wallet platform that integrates with various blockchain networks, providing secure, efficient, and user-friendly tools for users to manage their assets. This repository covers the backend implementation of the project, including OTP-based user signup, email notifications, and database integration.

## Features

- **OTP Authentication**: Secure user signup via One-Time Password (OTP).
- **Email Integration**: OTP sent to the user's email using Mailtrap.
- **Database Integration**: Sequelize for database connection and user data management.
- **Express Framework**: RESTful API to handle user authentication and related routes.

---

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (>= 14.x)
- NPM (>= 6.x)
- A database (e.g., MySQL, SQLite) for development (MySQL recommended).

---

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/icekid/spear-wallet.git
    cd spear-wallet
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and configure the necessary environment variables:
    ```plaintext
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=spear_wallet
    SMTP_USER=your_mailtrap_username
    SMTP_PASS=your_mailtrap_password
    SMTP_HOST=smtp.mailtrap.io
    SMTP_PORT=587
    ```

4. Run migrations for your database setup (make sure you have the correct Sequelize configuration).

5. Start the server:
    ```bash
    npm run dev
    ```

The server will now be running at `http://localhost:3000`.

---

## API Endpoints

### 1. **POST /api/auth/signup**

This endpoint accepts an email address and sends an OTP to the user's email.

**Request Body**:
```json
{
  "email": "user@example.com"
}

Response:

    Success: { "message": "OTP sent to your email" }
    Failure: { "message": "Email is required" } or other validation errors.

2. POST /api/auth/verify-otp

This endpoint verifies the OTP entered by the user for signup completion.

Request Body:

{
  "email": "user@example.com",
  "otp": "123456"
}

Response:

    Success: { "message": "Signup successful" }
    Failure: { "message": "Invalid OTP" }

OTP Logic

The OTP is randomly generated using the crypto module. When a user signs up with an email, a random 6-digit OTP is generated and sent to the provided email address.

The OTP is stored temporarily in memory (otpStorage). Upon verifying the OTP, the stored OTP for that user is removed, and the user is registered in the database (userDatabase).
Code Reference

    OTP Generation: crypto.randomInt(100000, 999999)
    Email Sending: The email is sent via the Mailtrap SMTP service using the emailjs package.

Database Configuration

The backend uses Sequelize ORM to interact with the database. Ensure the database is set up correctly in your .env file and that the connection is established when the server starts.
Database Setup:

    Sequelize model for user management (User).
    db.js to manage database connection and authentication.
    server.js sets up the database connection on startup.

Testing
Manual Testing with Postman

You can manually test the following:

    Signup Endpoint: Send a POST request to /api/auth/signup with the email.
    Verify OTP Endpoint: Send a POST request to /api/auth/verify-otp with the email and OTP.

Future Enhancements

    JWT Authentication: Add JWT-based authentication for secure session handling after signup.
    Email Validation: Implement a mechanism to verify email addresses before sending OTPs.
    Rate Limiting: Protect endpoints like /signup and /verify-otp to prevent abuse with rate limiting.

Troubleshooting

    SMTP Error: If you receive SMTP connection errors, ensure the SMTP credentials and host configurations in .env are correct.
    Database Connection Issues: Verify the database configurations (e.g., user, password, host) in the .env file and check if the MySQL server is running.

License

This project is licensed under the MIT License - see the LICENSE file for details.


### Key Sections:

- **Installation and Configuration**: Setup instructions for dependencies, environment variables, and server startup.
- **API Endpoints**: Details of the `/signup` and `/verify-otp` endpoints.
- **OTP Logic**: Explanation of how OTPs are generated and sent.
- **Database Setup**: Configuration details related to the database.
- **Future Enhancements and Troubleshooting**: Potential improvements and guidance on common issues.

This `README.md` should help provide a clear and structured view of your project, from setup to deployment.
