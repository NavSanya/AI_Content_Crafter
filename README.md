# AI Content Crafter

AI Content Crafter is a web application that leverages Google's Gemini generative AI model to create various types of content based on user prompts. The project consists of a Flask backend API that interacts with the Gemini API to generate content dynamically.

## Features

- Generate AI-based content for different content types using custom prompts.
- Simple REST API backend built with Flask.
- Integration with Google Gemini generative AI model.
- CORS enabled to allow frontend interaction.

## Backend

The backend is built using Flask and exposes the following endpoints:

- `GET /`  
  Returns a simple status message indicating the backend is running.

- `POST /generate`  
  Accepts a JSON payload with the following fields:  
  - `prompt` (string): The input text prompt for content generation.  
  - `content_type` (string): The type of content to generate (e.g., article, blog post, etc.).  

  Returns a JSON response with the generated content.

## Gemini API Integration

The backend uses the Google Gemini generative AI API to generate content. It requires an API key to be set in an environment variable:

- `GEMINI_API_KEY`: Your Google Gemini API key.

The key should be stored in a `.env` file in the backend directory or set in your environment.

## Setup and Running

1. Clone the repository.

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Create a virtual environment and activate it (optional but recommended):

   ```bash
   python -m venv venv
   .\venv\Scripts\activate   # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```

4. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory and add your Gemini API key:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

6. Run the Flask backend:

   ```bash
   python app.py
   ```

7. The backend will be available when you open `index.html` on your browser.

## License

This project is licensed under the terms of the LICENSE file in the repository.
