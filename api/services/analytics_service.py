from sqlalchemy.orm import Session
from sqlalchemy import func
from api.db.models.order import Order
import logging

logger = logging.getLogger(__name__)

class AnalyticsService:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard_stats(self):
        """
        Calculates key performance metrics for the dashboard.
        """
        total_revenue = self.db.query(func.sum(Order.total_price)).scalar() or 0
        total_profit = self.db.query(func.sum(Order.profit)).scalar() or 0
        order_count = self.db.query(func.count(Order.id)).scalar() or 0
        
        # Calculate daily stats (placeholder logic)
        return {
            "total_revenue": round(total_revenue, 2),
            "total_profit": round(total_profit, 2),
            "order_count": order_count,
            "avg_margin": round((total_profit / total_revenue * 100), 2) if total_revenue > 0 else 0
        }

    def record_order_financials(self, order_id: int, supplier_cost: float):
        """
        Calculates and records profit for an order.
        """
        order = self.db.query(Order).filter(Order.id == order_id).first()
        if order:
            order.supplier_cost = supplier_cost
            order.profit = order.total_price - supplier_cost
            self.db.commit()
            logger.info(f"Recorded profit for order {order_id}: ${order.profit}")
            return True
        return False
