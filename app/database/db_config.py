from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://postgres:password@127.0.0.1:5432/spear_wallet"

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create an async session maker
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

# Create tables asynchronously
async def create_tables():
    """Asynchronously create all database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
