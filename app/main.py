from fastapi import FastAPI
from app.database.db_config import database, create_tables
from app.routes.user import router as user_router

app = FastAPI()

app.include_router(user_router, prefix="/users", tags=["Users"])

@app.on_event("startup")
async def startup():
    # Connect to the database
    await database.connect()
    
    # Create tables asynchronously
    await create_tables()
    print("Database tables created successfully.")

@app.on_event("shutdown")
async def shutdown():
    # Disconnect from the database
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Welcome to Spear Wallet Backend!"}
