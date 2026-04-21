from app.services.aliexpress import AliExpressScraper
from app.services.groq_service import GroqService
from app.services.ebay import EbayService
from app.services.daraz import DarazService
from app.db.models.product import Product
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

class ListingManager:
    def __init__(self, db: Session):
        self.db = db
        self.groq = GroqService()
        self.ebay = EbayService()
        self.daraz = DarazService()

    async def list_product_on_marketplaces(self, product_id: int):
        """
        End-to-end workflow to list a product.
        """
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            logger.error(f"Product {product_id} not found")
            return False

        # 1. AI Rewrite
        logger.info(f"Rewriting copy for product: {product.title}")
        rewritten = self.groq.rewrite_product_listing(product.title, product.description or "")
        
        # 2. Price Markup (1.5x)
        markup_price = product.supplier_price * 1.5
        
        listing_data = {
            "title": rewritten["title"],
            "description": rewritten["description"],
            "image_url": product.image_url,
            "stock": 10, # Default stock
            "price": markup_price
        }

        # 3. List on eBay
        logger.info(f"Listing product {product_id} on eBay")
        ebay_res = await self.ebay.create_inventory_item(f"SKU-{product.id}", listing_data)
        
        # 4. List on Daraz
        logger.info(f"Listing product {product_id} on Daraz")
        daraz_res = await self.daraz.create_product(listing_data)

        # Update product status in DB
        product.sale_price = markup_price
        # product.status = "LISTED" # Should add a status field
        self.db.commit()

        return {"ebay": ebay_res, "daraz": daraz_res}
