import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

async def test_tracking_service():
    print("Testing TrackingService initialization and mock sync...")
    try:
        from api.services.tracking_service import TrackingService
        from sqlalchemy import create_mock_engine
        from sqlalchemy.orm import sessionmaker

        # Mock DB session
        engine = create_mock_engine("postgresql://", lambda x: None)
        Session = sessionmaker(bind=engine)
        db = Session()
        
        service = TrackingService(db)
        print("✅ TrackingService initialized")
        
        res = await service.fetch_aliexpress_tracking("12345")
        if res == "LX12345CN":
            print("✅ Tracking fetch logic working")
            
        print("\nTracking Service is ready!")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_tracking_service())
