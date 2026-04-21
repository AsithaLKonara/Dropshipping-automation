from fastapi import APIRouter

from api.api import products, orders, agent, auth

router = APIRouter()

router.include_router(products.router, prefix="/products", tags=["products"])
router.include_router(orders.router, prefix="/orders", tags=["orders"])
router.include_router(agent.router, prefix="/agent", tags=["agent"])
router.include_router(auth.router, prefix="/auth", tags=["auth"])
