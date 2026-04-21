from api.worker.celery_app import celery_app
from api.services.aliexpress import AliExpressScraper
from api.services.listing_manager import ListingManager
from api.services.order_manager import OrderManager
from api.db.session import SessionLocal
from api.db.models.product import Product
import asyncio
import logging

logger = logging.getLogger(__name__)

@celery_app.task(name="scrape_aliexpress_products")
def scrape_aliexpress_products(keyword: str, limit: int = 10):
    """
    Background task to scrape products from AliExpress and save to DB.
    """
    logger.info(f"Starting scrape for keyword: {keyword}")
    
    scraper = AliExpressScraper()
    
    # Run the async scraper in the synchronous Celery worker
    loop = asyncio.get_event_loop()
    if loop.is_running():
        # This shouldn't happen in a typical Celery worker setup
        future = asyncio.ensure_future(run_scraper(scraper, keyword, limit))
        results = loop.run_until_complete(future)
    else:
        results = asyncio.run(run_scraper(scraper, keyword, limit))
    
    # Save to database
    db = SessionLocal()
    saved_count = 0
    try:
        for item in results:
            # Check if product already exists
            existing_product = db.query(Product).filter(Product.supplier_url == item["supplier_url"]).first()
            if not existing_product:
                new_product = Product(
                    title=item["title"],
                    supplier_url=item["supplier_url"],
                    supplier_price=item["price"],
                    rating=item["rating"],
                    orders=item["orders"],
                    image_url=item["image_url"]
                )
                db.add(new_product)
                saved_count += 1
        db.commit()
    except Exception as e:
        logger.error(f"Error saving to database: {e}")
        db.rollback()
    finally:
        db.close()
    
    logger.info(f"Finished scraping. Saved {saved_count} new products.")
    return {"status": "success", "products_scraped": saved_count}

@celery_app.task(name="list_product_task")
def list_product_task(product_id: int):
    """
    Background task to list a product on marketplaces.
    """
    db = SessionLocal()
    try:
        manager = ListingManager(db)
        # Use asyncio.run since ListingManager methods are async
        result = asyncio.run(manager.list_product_on_marketplaces(product_id))
        return {"status": "success", "result": result}
    except Exception as e:
        logger.error(f"Error listing product {product_id}: {e}")
        return {"status": "error", "message": str(e)}
    finally:
        db.close()

@celery_app.task(name="sync_orders_task")
def sync_orders_task():
    """
    Background task to sync new orders from marketplaces.
    """
    db = SessionLocal()
    try:
        manager = OrderManager(db)
        result = asyncio.run(manager.sync_new_orders())
        return result
    finally:
        db.close()

@celery_app.task(name="process_orders_task")
def process_orders_task():
    """
    Background task to process pending orders on AliExpress.
    """
    db = SessionLocal()
    try:
        manager = OrderManager(db)
        result = asyncio.run(manager.process_pending_orders())
        return result
    finally:
        db.close()

async def run_scraper(scraper, keyword, limit):
    product_links = await scraper.search_products(keyword, limit)
    results = []
    for link in product_links:
        try:
            details = await scraper.get_product_details(link["url"])
            # Apply filters from Phase 2
            if details["rating"] >= 4.5 and details["orders"] >= 500:
                results.append(details)
        except Exception as e:
            logger.error(f"Error getting details for {link['url']}: {e}")
    return results
