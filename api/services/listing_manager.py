from api.services.aliexpress import AliExpressScraper
from api.services.groq_service import GroqService
from api.services.ebay import EbayService
from api.services.daraz import DarazService
from api.services.image_service import ImageService
from api.db.models.product import Product
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

class ListingManager:
    def __init__(self, db: Session):
        self.db = db
        self.groq = GroqService()
        self.ebay = EbayService()
        self.daraz = DarazService()
        self.image_service = ImageService()

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
        
        # 3. Handle Images
        logger.info(f"Downloading images for product {product_id}")
        local_images = self.image_service.optimize_images([product.image_url])
        
        listing_data = {
            "title": rewritten["title"],
            "description": rewritten["description"],
            "image_url": product.image_url,
            "local_images": local_images,
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
