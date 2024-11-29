from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv
import sqlalchemy
from app.models.user import Base

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create tables in the database(you only need to run this once)
def create_tables():
    engine = sqlalchemy.create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session factory
async_session = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for models
Base = declarative_base()

# Dependency for getting the session
async def get_db():
    async with async_session() as session:
        yield session

# Connect and disconnect database
async def connect():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def disconnect():
    await engine.dispose()

print(f"DATABASE_URL: {DATABASE_URL}")