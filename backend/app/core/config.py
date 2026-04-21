from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Dropshipping Automation"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/dropshipping"
    
    # Redis & Celery
    REDIS_URL: str = "redis://redis:6379/0"
    
    # External APIs
    GROQ_API_KEY: Optional[str] = None
    EBAY_CLIENT_ID: Optional[str] = None
    EBAY_CLIENT_SECRET: Optional[str] = None
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
