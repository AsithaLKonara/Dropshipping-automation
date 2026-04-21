import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

async def test_imports():
    print("Testing imports and service initialization...")
    try:
        from api.services.image_service import ImageService
        from api.services.listing_manager import ListingManager
        from sqlalchemy import create_mock_engine
        from sqlalchemy.orm import sessionmaker

        img_service = ImageService()
        print("✅ ImageService initialized")
        
        # Mock DB session
        engine = create_mock_engine("postgresql://", lambda x: None)
        Session = sessionmaker(bind=engine)
        db = Session()
        
        manager = ListingManager(db)
        print("✅ ListingManager initialized")
        
        print("\nAll core listing services are healthy!")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_imports())
