from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_service import generate_content

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

@app.route('/', methods=['GET'])
def home():
    return "AI Content Crafter backend is running!"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()

    prompt = data.get('prompt')
    content_type = data.get('content_type')

    if not prompt or not content_type:
        return jsonify({"error": "Missing prompt or content type."}), 400

    generated = generate_content(prompt, content_type)

    return jsonify({
        "generated_content": generated
    })

if __name__ == '__main__':
    app.run(debug=True)
