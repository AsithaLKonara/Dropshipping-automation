import asyncio
from playwright.async_api import async_playwright
import logging
import json
import os

logger = logging.getLogger(__name__)

class AliExpressOrderService:
    def __init__(self, session_path: str = "sessions/aliexpress.json"):
        self.session_path = session_path
        if not os.path.exists("sessions"):
            os.makedirs("sessions")

    async def place_order(self, product_url: str, customer_details: dict):
        """
        Automated checkout flow on AliExpress.
        """
        async with async_playwright() as p:
            # Use persistent context to keep login session
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                storage_state=self.session_path if os.path.exists(self.session_path) else None,
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )
            page = await context.new_page()

            try:
                logger.info(f"Navigating to {product_url}")
                await page.goto(product_url, wait_until="networkidle")

                # 1. Check for Login
                if await page.query_selector('a[data-role="login-link"]'):
                    logger.warning("Session expired or missing. Manual login required for first time.")
                    # In a real scenario, we might use a proxy or wait for manual login
                    # For now, we assume a valid session exists in storage_state
                    return {"status": "error", "message": "auth_required"}

                # 2. Select first variation (if any)
                # This is highly dependent on AliExpress UI which changes often
                variations = await page.query_selector_all('.sku-property-item')
                if variations:
                    await variations[0].click()
                    await asyncio.sleep(1)

                # 3. Buy Now
                buy_now_btn = await page.query_selector('.buy-now-wrap button')
                if buy_now_btn:
                    await buy_now_btn.click()
                else:
                    logger.error("Buy Now button not found")
                    return {"status": "error", "message": "buy_now_not_found"}

                # 4. Shipping Address Injection (Simplified placeholder)
                # In production, this would involve clicking "Change Address" and filling fields
                await page.wait_for_selector('.order-detail-info', timeout=10000)
                logger.info("Reached checkout page successfully")

                # Save session for future use
                await context.storage_state(path=self.session_path)
                
                return {"status": "success", "order_id": "MOCK-ALI-ORDER-ID"}

            except Exception as e:
                logger.error(f"Error during automated checkout: {str(e)}")
                return {"status": "error", "message": str(e)}
            finally:
                await browser.close()

    async def save_session(self, cookies: list):
        """
        Helper to save manual login session.
        """
        with open(self.session_path, 'w') as f:
            json.dump({"cookies": cookies}, f)
