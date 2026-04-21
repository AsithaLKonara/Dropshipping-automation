from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.db.base_class import Base

class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    supplier_url = Column(String, unique=True, index=True)
    rating = Column(Float, nullable=True)
    orders = Column(Integer, default=0)
    stock = Column(Integer, default=0)
    supplier_price = Column(Float)
    sale_price = Column(Float, nullable=True)
    profit_score = Column(Float, nullable=True)
    shipping_time = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
