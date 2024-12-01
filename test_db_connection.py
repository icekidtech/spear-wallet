from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.sql import text
import asyncio

# Replace with your actual database URL
DATABASE_URL = "postgresql+asyncpg://postgres:password@127.0.0.1:5432/spear_wallet"

# Create the async engine
engine = create_async_engine(DATABASE_URL, echo=True)

async def test_connection():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Database connection successful:", result.scalar())
    except Exception as e:
        print("Database connection failed:", e)

# Run the test
if __name__ == "__main__":
    asyncio.run(test_connection())
