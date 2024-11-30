from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.database.database import SessionLocal

router = APIRouter()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: SessionLocal = Depends(get_db)): # type: ignore
    # Check if the user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.password #Replaced with hashed password later
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user