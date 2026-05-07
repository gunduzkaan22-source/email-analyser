import os
import anthropic
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyse', methods=['POST'])
def analyse():
    data = request.get_json()
    email_text = (data or {}).get('email', '').strip()
    tone = (data or {}).get('tone', 'Professional').strip() or 'Professional'

    if not email_text:
        return jsonify({'error': 'No email provided'}), 400

    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system="You are a business email analyst. Always respond with valid JSON only. No markdown, no extra text, just pure JSON.",
        messages=[
            {
                "role": "user",
                "content": (
                    "Analyse this email and return a JSON object with these fields: "
                    "sender_mood, urgency (low/medium/high), summary, action_items (a list), "
                    "suggested_reply, recommended_response_time (one of: 'within 24 hours', "
                    "'within 48 hours', 'within a week', 'no response needed' — based on "
                    f"urgency, deadlines mentioned, and tone).\n\n"
                    f"Write the suggested_reply in a {tone} tone.\n\nEmail:\n{email_text}"
                )
            }
        ]
    )

    raw = response.content[0].text
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    return jsonify(json.loads(cleaned))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
