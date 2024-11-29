from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.user_service import create_user, login_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    try:
        new_user = await create_user(user)
        return new_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login", response_model=UserResponse)
async def login_user_endpoint(user: UserLogin):
    try:
        user_response = await login_user(user)
        return user_response
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid credentials")