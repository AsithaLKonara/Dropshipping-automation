import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

async def test_stock_monitor():
    print("Testing StockMonitorService initialization...")
    try:
        from api.services.stock_monitor import StockMonitorService
        from sqlalchemy import create_mock_engine
        from sqlalchemy.orm import sessionmaker

        # Mock DB session
        engine = create_mock_engine("postgresql://", lambda x: None)
        Session = sessionmaker(bind=engine)
        db = Session()
        
        service = StockMonitorService(db)
        print("✅ StockMonitorService initialized")
            
        print("\nStock Monitor is ready!")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_stock_monitor())
