from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from api.db.base_class import Base

class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    marketplace_order_id = Column(String, unique=True, index=True)
    product_id = Column(Integer, ForeignKey("product.id"))
    customer_name = Column(String)
    customer_address = Column(Text)
    total_price = Column(Float)
    status = Column(String, default="PENDING") # PENDING, ORDERED, SHIPPED, COMPLETED
    supplier_order_id = Column(String, nullable=True)
    supplier_cost = Column(Float, nullable=True)
    profit = Column(Float, nullable=True)
    tracking_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
