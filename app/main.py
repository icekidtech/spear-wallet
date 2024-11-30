from fastapi import FastAPI
from app.database import database, create_tables
from app.routes.user import router as user_router

app = FastAPI()

app.include_router(user_router, prefix="/users", tags=["Users"])  # Include the router with a prefix

@app.on_event("startup")
async def startup():
    # Connect to the databse
    await database.connect()
    
    # Create tables
    create_tables()
    print("Database tables created successfully.")

@app.on_event("shutdown")
async def shutdown():
    # Disconnect from the database
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Welcome to Spear Wallet Backend!"}

