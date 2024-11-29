from fastapi import FastAPI
from .database import database, create_tables
from app.routes.routes import router  # Import the router

app = FastAPI()

app.include_router(router, prefix="/api/v1")  # Include the router with a prefix

@app.on_event("startup")
async def startup():
    await database.connect()
    create_tables() #Create tables if they don't exist

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Welcome to Spear Wallet Backend!"}

