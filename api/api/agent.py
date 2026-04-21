from fastapi import APIRouter, Depends
from pydantic import BaseModel
from api.services.agent_service import AgentService

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: list = []

@router.post("/chat")
async def chat_with_agent(request: ChatRequest):
    agent = AgentService()
    response = await agent.chat(request.message, request.history)
    return response
