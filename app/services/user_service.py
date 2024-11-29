from app.database import database
from app.schemas.user import UserCreate, UserResponse
from app.models import User #Assuming you have an ORM mode for User
from app.utils.encryption import encrypt_password

# Function to create a new user
async def create_user(user:UserCreate) -> UserResponse:
    # Encrypt the user's password
    hashed_password = encrypt_password(user.password)
    
    # Create new user and store it in the databse
    db_user = User(username=user.username, email=user.email, password=hashed_password)
    
    #Save the user into the database (assuming SQLAlchemy or similar ORM)
    await database.execute(User.insert().values(db_user))
        
        # Return the response schema
    return UserResponse(username=db_user.username, email=db_user.email)
    
# Function to log a user in
async def login_user(user: UserLogin) -> UserResponse:
    db_user = await database.fetch_one(User.selct().where(User.email == user.email))
    
    if db_user and db_user.password == encrypt_password(user.password):
        return UserResponse(username=db_user.username, email=db_user.email)
    else:
        raise Exception("Invalid credentials!")