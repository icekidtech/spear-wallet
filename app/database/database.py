from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemy engine for async operations
engine = create_async_engine(DATABASE_URL, echo=True)

# Session maker for database sessions
async_session = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for models
Base = declarative_base()

# Dependency to get the session
async def get_db():
    async with async_session() as session:
        yield session

# Function to connect and disconnect the database
async def connect():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def disconnect():
    await engine.dispose()
