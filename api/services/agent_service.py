import json
import logging
from api.services.groq_service import GroqService
from api.worker.tasks import scrape_aliexpress_products, list_product_task
from api.services.analytics_service import AnalyticsService
from api.db.session import SessionLocal

logger = logging.getLogger(__name__)

class AgentService:
    def __init__(self):
        self.groq = GroqService()
        
    def get_tools(self):
        return [
            {
                "type": "function",
                "function": {
                    "name": "scrape_aliexpress",
                    "description": "Scrape products from AliExpress based on a keyword.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "keyword": {"type": "string", "description": "The search term for products."},
                            "limit": {"type": "integer", "description": "Number of products to scrape (max 50).", "default": 10}
                        },
                        "required": ["keyword"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "list_product",
                    "description": "Rewrite and list a specific product to marketplaces like eBay/Daraz.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "product_id": {"type": "integer", "description": "The ID of the product in our database."}
                        },
                        "required": ["product_id"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_system_stats",
                    "description": "Get overall profit, order counts, and system performance metrics."
                }
            }
        ]

    async def chat(self, message: str, history: list = []):
        """
        Handles the agent chat logic with tool calling.
        """
        messages = [{"role": "system", "content": "You are the AutoDrop AI Command Center. You help the user manage their dropshipping business by executing tasks like scraping and listing."}]
        messages.extend(history)
        messages.append({"role": "user", "content": message})

        try:
            response = self.groq.client.chat.completions.create(
                model="llama3-8b-8192",
                messages=messages,
                tools=self.get_tools(),
                tool_choice="auto"
            )

            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls

            if tool_calls:
                # Handle tool execution
                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    logger.info(f"AI Agent triggering tool: {function_name} with {function_args}")
                    
                    if function_name == "scrape_aliexpress":
                        scrape_aliexpress_products.delay(function_args["keyword"], function_args.get("limit", 10))
                        return {"role": "assistant", "content": f"🚀 I've started a background task to scrape AliExpress for '{function_args['keyword']}'. I'll notify you when it's done!"}
                    
                    elif function_name == "list_product":
                        list_product_task.delay(function_args["product_id"])
                        return {"role": "assistant", "content": f"📦 Listing process initiated for Product ID {function_args['product_id']}. AI is currently rewriting the content."}
                    
                    elif function_name == "get_system_stats":
                        with SessionLocal() as db:
                            stats = AnalyticsService(db).get_dashboard_stats()
                        return {"role": "assistant", "content": f"📈 Here are your current stats:\n- Total Profit: ${stats['total_profit']}\n- Orders: {stats['order_count']}\n- Avg Margin: {stats['avg_margin']}%"}

            return {"role": "assistant", "content": response_message.content}

        except Exception as e:
            logger.error(f"Agent Chat Error: {str(e)}")
            return {"role": "assistant", "content": "I encountered an error while processing your request. Please try again."}
