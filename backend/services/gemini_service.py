import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

# Configure Gemini
genai.configure(api_key=api_key)

# Initialize model
model = genai.GenerativeModel("gemini-2.5-flash")


def call_gemini(prompt: str):
    try:
        response = model.generate_content(prompt)

        if response and response.text:
            return response.text.strip()
        else:
            return "No response from AI"

    except Exception as e:
        return f"Error: {str(e)}"