import asyncio
from typing import List, Dict, Any
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AliExpressScraper:
    def __init__(self):
        self.base_url = "https://www.aliexpress.com"
        
    async def search_products(self, keyword: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Searches for products on AliExpress and returns a list of product URLs.
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            
            search_url = f"{self.base_url}/wholesale?SearchText={keyword}"
            logger.info(f"Searching for {keyword} at {search_url}")
            
            await page.goto(search_url, wait_until="networkidle")
            
            # Wait for product cards to load
            await page.wait_for_selector(".search-item-card", timeout=10000)
            
            content = await page.content()
            soup = BeautifulSoup(content, 'html.parser')
            
            product_cards = soup.select(".search-item-card")
            products = []
            
            for card in product_cards[:limit]:
                link_tag = card.select_one("a.search-card-item")
                if link_tag and 'href' in link_tag.attrs:
                    url = link_tag['href']
                    if url.startswith("//"):
                        url = "https:" + url
                    products.append({"url": url})
            
            await browser.close()
            return products

    async def get_product_details(self, url: str) -> Dict[str, Any]:
        """
        Fetches detailed information for a specific product URL.
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            logger.info(f"Fetching details for {url}")
            await page.goto(url, wait_until="networkidle")
            
            # Wait for key elements (selectors might need adjustment)
            # Example selectors: title, price, rating, orders
            try:
                await page.wait_for_selector("h1", timeout=5000)
            except:
                logger.error(f"Timeout waiting for product title on {url}")
            
            content = await page.content()
            soup = BeautifulSoup(content, 'html.parser')
            
            details = {
                "supplier_url": url,
                "title": soup.select_one("h1").text.strip() if soup.select_one("h1") else "N/A",
                "price": self._extract_price(soup),
                "rating": self._extract_rating(soup),
                "orders": self._extract_orders(soup),
                "image_url": self._extract_image(soup)
            }
            
            await browser.close()
            return details

    def _extract_price(self, soup) -> float:
        # Placeholder for price extraction logic
        price_tag = soup.select_one(".product-price-value")
        if price_tag:
            try:
                return float(price_tag.text.replace("$", "").strip())
            except:
                return 0.0
        return 0.0

    def _extract_rating(self, soup) -> float:
        # Placeholder for rating extraction logic
        rating_tag = soup.select_one(".overview-rating-average")
        if rating_tag:
            try:
                return float(rating_tag.text.strip())
            except:
                return 0.0
        return 0.0

    def _extract_orders(self, soup) -> int:
        # Placeholder for orders extraction logic
        orders_tag = soup.select_one(".product-reviewer-sold")
        if orders_tag:
            try:
                # Often looks like "1000+ sold"
                return int(''.join(filter(str.isdigit, orders_tag.text)))
            except:
                return 0
        return 0

    def _extract_image(self, soup) -> str:
        img_tag = soup.select_one(".magnifier-image")
        return img_tag['src'] if img_tag and 'src' in img_tag.attrs else "N/A"
