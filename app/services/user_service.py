from sqlalchemy.future import select
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
    
    # Insert the user into the database
    query = User.__table__.insert().values(username=user.name, email=user.email, password=hashed_password)
    await database.execute(query)
    
    return db_user

async def get_user_by_email(email: str):
    query = select(User),filter(User.email == email)
    result = await database.fetch_one(query)
    return result
    
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