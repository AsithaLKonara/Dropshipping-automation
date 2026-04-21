from groq import Groq
from api.core.config import settings
import logging

logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY) if settings.GROQ_API_KEY else None

    def rewrite_product_listing(self, title: str, description: str) -> dict:
        """
        Uses Groq AI to rewrite product title and description for better SEO/Sales.
        """
        if not self.client:
            logger.warning("Groq API key not set. Skipping AI rewrite.")
            return {"title": title, "description": description}

        prompt = f"""
        Rewrite the following product title and description for an e-commerce listing on eBay/Daraz.
        Make it catchy, SEO-friendly, and professional.
        
        Original Title: {title}
        Original Description: {description}
        
        Return the result in JSON format:
        {{
            "title": "New catchy title",
            "description": "New professional description"
        }}
        """
        
        try:
            completion = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "You are a professional e-commerce copywriter."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            import json
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            logger.error(f"Error calling Groq API: {e}")
            return {"title": title, "description": description}
