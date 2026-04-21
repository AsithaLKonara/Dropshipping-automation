from api.services.groq_service import GroqService
import logging

logger = logging.getLogger(__name__)

class SupportService:
    def __init__(self):
        self.groq = GroqService()

    def generate_response(self, customer_message: str, order_context: dict = None) -> str:
        """
        Generates a professional, empathetic response to customer queries using Groq.
        """
        context_str = f"Order Details: {order_context}" if order_context else "No order context available."
        
        prompt = f"""
        You are a customer support agent for an e-commerce store.
        A customer has sent the following message: "{customer_message}"
        
        {context_str}
        
        Guidelines:
        1. Be professional and empathetic.
        2. If order status is provided, mention it clearly.
        3. If no order status is found, ask for their order number politely.
        4. Keep the response concise (max 3-4 sentences).
        
        Generate the response:
        """
        
        try:
            # We reuse the GroqService but might need a different system prompt or method
            # For now, we'll assume GroqService has a generic completion method
            response = self.groq.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a professional customer support assistant."},
                    {"role": "user", "content": prompt}
                ],
                model="llama3-8b-8192",
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error generating AI support response: {str(e)}")
            return "Thank you for reaching out. We are looking into your request and will get back to you shortly."
