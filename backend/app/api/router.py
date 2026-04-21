from fastapi import APIRouter

from app.api import products, orders

router = APIRouter()

router.include_router(products.router, prefix="/products", tags=["products"])
router.include_router(orders.router, prefix="/orders", tags=["orders"])
