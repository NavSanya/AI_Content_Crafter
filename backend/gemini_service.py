import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API Key from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-2.0-flash')

def generate_content(prompt, content_type):
    """
    Generates content using the Gemini model based on the input prompt and content type.
    """
    full_prompt = f"Generate {content_type.lower()} based on the following input:\n\n{prompt}"

    try:
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        print(f"Error with Gemini API: {e}")
        return "An error occurred while generating content."
