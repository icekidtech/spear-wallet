from fastapi import FastAPI
from app.database import database
from app.routes.routes import router  # Import the router

app = FastAPI()

app.include_router(router, prefix="/api/v1")  # Include the router with a prefix

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Welcome to Spear Wallet Backend!"}

