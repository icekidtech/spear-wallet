from pydantic import BaseModel, EmailStr, Field

#Schema for user registration request data
class UserCreate(BaseModel):
    username: str  = Field(..., min_length=3, max_length=20)
    email: EmailStr
    password: str = Field(..., min_length=8)
    
#Schema for user response data
class UserResponse(BaseModel):
    username: str
    email: EmailStr
    
    class config:
        orm_mode = True #This allows Pydantic to work with ORM models (e.g SQLAlchemy)
        
#Schema for user login request data
class UserLogin(BaseModel):
    email: EmailStr
    password: str