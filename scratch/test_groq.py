import os
import sys
from dotenv import load_dotenv

# Add the project root to sys.path
sys.path.append(os.getcwd())

# Load .env file
load_dotenv()

def test_groq_api():
    print("Testing Groq API integration...")
    
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("❌ GROQ_API_KEY not found in .env")
        return

    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        
        print(f"Using API Key: {api_key[:10]}...")
        
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say 'Groq is Online' if you can read this."}
            ]
        )
        
        response = completion.choices[0].message.content
        print(f"Response from Groq: {response}")
        
        if "Groq is Online" in response:
            print("\n✅ Groq API is WORKING correctly!")
        else:
            print("\n⚠️ Groq responded but didn't follow instructions exactly.")
            
    except Exception as e:
        print(f"❌ Groq API Test Failed: {str(e)}")

if __name__ == "__main__":
    test_groq_api()
