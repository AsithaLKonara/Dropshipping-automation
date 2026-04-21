import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

async def test_playwright_launch():
    print("Testing Playwright launch for AliExpressOrderService...")
    try:
        from api.services.aliexpress_order_flow import AliExpressOrderService
        from playwright.async_api import async_playwright
        
        service = AliExpressOrderService()
        print("✅ AliExpressOrderService initialized")
        
        async with async_playwright() as p:
            print("Launching browser...")
            browser = await p.chromium.launch(headless=True)
            print("✅ Chromium launched successfully")
            await browser.close()
            
        print("\nPlaywright and Order Service are ready!")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_playwright_launch())
