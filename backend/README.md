# Spear Wallet

This is the backend service for the Spear Wallet, built with Node.js and Express.js. It connects to a PostgreSQL database using Sequelize for ORM functionality.

## Features
- User authentication
- API routes for wallet operations
- Secure connection to PostgreSQL database
- Scalable project structure

## Prerequisites
- Node.js (v16+)
- PostgreSQL (v13+)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/icekidtech/spear-wallet.git
   cd spear-wallet

    Install dependencies:

npm install

Create a .env file and configure it:

DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_HOST=localhost
DB_PORT=5432
PORT=3000

Run the development server:

    npm run dev

Project Structure

backend/
├── src/
│   ├── config/      # Database configuration
│   ├── controllers/ # Controllers for route logic
│   ├── models/      # Sequelize models
│   ├── routes/      # API route definitions
│   ├── services/    # Business logic and reusable functions
│   └── utils/       # Utility files
├── tests/           # Unit and integration tests
└── server.js        # Entry point
blockchain/
frontend/

License

This project is licensed under the MIT License.


---

### 3. **Dependencies File**
Save this as `dependencies.txt` (if you’re listing them separately from `package.json`):
```plaintext
express
dotenv
sequelize
pg
pg-hstore
nodemon
cors
bcryptjs
jsonwebtoken
jest
supertest

You can install all dependencies at once with:

npm install express dotenv sequelize pg pg-hstore cors bcryptjs jsonwebtoken
npm install --save-dev nodemon jest supertest
