from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.db.models.order import Order
from app.worker.tasks import sync_orders_task, process_orders_task
from typing import List
from pydantic import BaseModel

router = APIRouter()

class OrderSchema(BaseModel):
    id: int
    marketplace_order_id: str
    status: str
    total_price: float
    
    class Config:
        from_attributes = True

@router.post("/sync", status_code=202)
async def trigger_sync():
    task = sync_orders_task.delay()
    return {"task_id": task.id, "message": "Order sync started"}

@router.post("/process", status_code=202)
async def trigger_process():
    task = process_orders_task.delay()
    return {"task_id": task.id, "message": "Order processing started"}

@router.get("/", response_model=List[OrderSchema])
async def list_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()
