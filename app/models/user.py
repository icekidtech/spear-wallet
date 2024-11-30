from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.database.database import Base

Base = declarative_base()

#Define the User model which maps to the "users" table in the database
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String) #Store encrypted password here