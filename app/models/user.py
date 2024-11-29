from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#Define the User model which maps to the "users" table in the database
class User(Base):
    __tablename__ = 'users'
    
    id = column(Integer, primary_key=True, index=True)
    username = Column(string, unique=True, index=True)
    email = column(String, unique=True, index=True)
    password = column(string) #Store encrypted password here