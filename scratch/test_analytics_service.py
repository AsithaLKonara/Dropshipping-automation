import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

def test_analytics_service():
    print("Testing AnalyticsService initialization...")
    try:
        from api.services.analytics_service import AnalyticsService
        from sqlalchemy import create_mock_engine
        from sqlalchemy.orm import sessionmaker

        # Mock DB session
        engine = create_mock_engine("postgresql://", lambda x: None)
        Session = sessionmaker(bind=engine)
        db = Session()
        
        service = AnalyticsService(db)
        print("✅ AnalyticsService initialized")
        
        print("\nAnalytics Service is ready!")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    test_analytics_service()
