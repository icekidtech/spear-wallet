from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
import base64

# Function to encrypt passwords using PBKDF2
def encrypt_password(password: str) -> str:
    # Generate a salt (it should be unique and random in production)
    salt = b"some_random_salt"
    
    # Create the key derivation function (PBKDF2)
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256()
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    
    # Derive the key and return it in base 64
    key = kdf.derive(password.encode())
    return base64.b64encode(key).decode()

# Function to verify the encrypted password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Assuming the salt used for encryption is the same for both encrypt and verify
    salt = b"some_random_salt" #Same salt used during encryption
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256()
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    
    try:
        # Verify if the hashed password matches the input password
        kdf.verify(plain_password.encode(), base64.b64decode(hashed_password))
        return True
    except Exception:
        return False