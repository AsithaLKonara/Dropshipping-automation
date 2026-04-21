from api.services.aliexpress import AliExpressScraper
from api.db.models.product import Product
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

class StockMonitorService:
    def __init__(self, db: Session):
        self.db = db
        self.scraper = AliExpressScraper()

    async def check_inventory_health(self):
        """
        Polls AliExpress to ensure listed products are still available.
        """
        listed_products = self.db.query(Product).filter(Product.sale_price != None).all()
        
        updates = []
        for product in listed_products:
            logger.info(f"Checking stock for product {product.id}")
            # Use scraper to check stock status
            is_available = await self.scraper.check_availability(product.supplier_url)
            
            if not is_available:
                logger.warning(f"Product {product.id} is OUT OF STOCK on AliExpress!")
                # In production, this would trigger an eBay/Daraz inventory update to 0
                updates.append({"product_id": product.id, "status": "OUT_OF_STOCK"})
            else:
                updates.append({"product_id": product.id, "status": "AVAILABLE"})
                
        return updates
