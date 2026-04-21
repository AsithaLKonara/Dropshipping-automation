from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from api.db.deps import get_db
from api.db.models.product import Product
from api.worker.tasks import scrape_aliexpress_products, list_product_task
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ScrapeRequest(BaseModel):
    keyword: str
    limit: int = 10

class ProductSchema(BaseModel):
    id: int
    title: str
    supplier_url: str
    supplier_price: float
    rating: float
    orders: int
    
    class Config:
        from_attributes = True

@router.post("/scrape", status_code=202)
async def trigger_scrape(request: ScrapeRequest):
    """
    Trigger a background task to scrape AliExpress.
    """
    task = scrape_aliexpress_products.delay(request.keyword, request.limit)
    return {"task_id": task.id, "message": "Scraping task started"}

@router.get("/", response_model=List[ProductSchema])
async def list_products(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    """
    List all scraped products.
    """
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@router.post("/{product_id}/list", status_code=202)
async def trigger_listing(product_id: int):
    """
    Trigger a background task to list a product on marketplaces.
    """
    task = list_product_task.delay(product_id)
    return {"task_id": task.id, "message": "Listing task started"}
