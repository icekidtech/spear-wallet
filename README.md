# Spear Wallet Backend

## Over View
    Spear Wallet is a backend system designed for decentralized wallet platform built on the Solana blockchain. It focuses on low transaction fees, high-speed transaction, and scalability, with cross-chain support powered by the Wormhole protocol.

## Key Features

* User Authentication:

- Signup via email/Google with OTP verification.
- Biometric-based account verification and recovery.
- Username-based wallet identification for easy recognition.

* Wallet Management:

- Wallet creation and encryption.
- Unlock wallets with biometrics, session keys, or 6-digit passwords.
- Secure recovery with seed phrases or email OTPs.

* Transaction Processing:

- Approve transaction using biometrics or 4-digit PIN.
- Save beneficiaries for faster transactions.

* Cross-Chain Transactions:

- Wormhole protocol integration for bridging assets across multiple blockchains.


## Technologies Used

### Backend Framework

    FastAPI: For building asynchronous, high-performance APIs.

### Blockchain Integrations

    Solana.py: To handle wallet creation, signing, and transactions on Solana.
    Wormhole SDK: For cross-chain transaction processing.

### Database

    PostgreSQL: For user, wallet, and transaction data storage.
    Redis: For caching OTPs and session keys.

### Other Libraries

    Authentication: Authlib, pyotp, python-jose
    Task Queue: Celery for handling background tasks.
    Biometrics: Third-party SDKs for fingerprint verification.
    Encryption: bcrypt and cryptography for sensitive data handling.

## Folder Structure

project_root/  
├── app/  
│   ├── auth/               # Authentication-related logic  
│   ├── biometrics/         # Biometrics-related logic  
│   ├── database/           # Database models and CRUD  
│   ├── routes/             # API endpoints  
│   ├── schemas/            # Data validation with Pydantic  
│   ├── services/           # Business logic (Solana, Wormhole, etc.)  
│   ├── utils/              # Utility functions (encryption, session management)  
│   ├── main.py             # FastAPI app entry point  
├── tests/                  # Unit and integration tests  
├── alembic/                # Database migrations  
├── .env                    # Environment variables  
├── requirements.txt        # Python dependencies  
├── Dockerfile              # Docker configuration  
├── docker-compose.yml      # Multi-container setup  
└── README.md               # Project documentation  

## Installation
### Prerequisites

    Python 3.9+
    PostgreSQL
    Redis
    Docker (optional for deployment)

## Steps

    Clone the repository:

git clone https://github.com/icekidtech/spear-wallet.git
cd spear-wallet  

### Create a virtual environment and install dependencies:

python -m venv venv  
source venv/bin/activate  # On Windows: venv\Scripts\activate  
pip install -r requirements.txt  

### Set up environment variables:

    Create a .env file:

    DATABASE_URL=postgresql://username:password@localhost/dbname  
    REDIS_URL=redis://localhost:6379  
    SECRET_KEY=your_secret_key  
    GOOGLE_CLIENT_ID=your_google_client_id  
    GOOGLE_CLIENT_SECRET=your_google_client_secret  
    SOLANA_RPC_URL=https://api.mainnet-beta.solana.com  

    Replace placeholders with your actual credentials.

Apply database migrations:

alembic upgrade head  

Start the server:

    uvicorn app.main:app --reload  

Usage
API Endpoints

    Authentication:
        POST /auth/signup: Register a new user.
        POST /auth/login: Log in with email, password, and OTP.
        POST /auth/verify-biometrics: Verify biometric data for authentication.

    Wallet:
        POST /wallet/create: Create a new Solana wallet.
        POST /wallet/unlock: Unlock wallet with biometrics or session keys.
        GET /wallet/balance: Check wallet balance.

    Transactions:
        POST /transactions/send: Send Solana tokens.
        POST /transactions/approve: Approve transaction with PIN/biometrics.
        GET /transactions/history: View transaction history.

    Cross-Chain:
        POST /wormhole/bridge: Bridge assets across chains.
        GET /wormhole/status: Check cross-chain transaction status.

Testing

Run unit tests to ensure the system works as expected:

pytest  

Deployment

You can deploy the application using Docker.
Build and Run Docker Containers

    Build the Docker image:

docker-compose build  

Start the containers:

    docker-compose up  

Contributing

Contributions are welcome!

    Fork the repository.
    Create a feature branch:

    git checkout -b feature-name  

    Commit your changes and create a pull request.

