from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from database import Database

# Database configuration
DATABASE_URL = "postgresql+asyncpg://spear_user:password@localhost/spear_wallet"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) #For SQLite
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Async Database Connection
database = Database(DATABASE_URL)

# Function to create all tables
def create_tables():
    """
    Create all tables in the database.
    This should only be called once during the app iitialization.
    """
    Base.metadata.create_all(bind=engine)