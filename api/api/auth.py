from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
import os

router = APIRouter()

# Admin credentials from environment variables
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "asithalakmalkonara11992081@gmail.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "A11992081s")

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest, response: Response):
    if request.email == ADMIN_EMAIL and request.password == ADMIN_PASSWORD:
        # In a real app, we would issue a JWT token
        # For now, we'll use a simple session cookie
        response.set_cookie(
            key="admin_session",
            value="active_session_token_123",
            httponly=True,
            max_age=3600 * 24, # 24 hours
            samesite="lax"
        )
        return {"status": "success", "message": "Logged in successfully"}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("admin_session")
    return {"status": "success"}

@router.get("/status")
async def check_status(admin_session: str = None):
    if admin_session == "active_session_token_123":
        return {"is_authenticated": True}
    return {"is_authenticated": False}
