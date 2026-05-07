import os
import anthropic
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

TONE_GUIDES = {
    "Professional": "clear, respectful, and business-appropriate — warm but not casual, direct without being blunt",
    "Friendly":     "warm, personable, and upbeat — like writing to a colleague you know well; contractions and light warmth are fine",
    "Formal":       "polished and structured — full sentences, no contractions, measured language suited to senior stakeholders or official correspondence",
    "Concise":      "brief and to the point — every sentence earns its place; cut pleasantries to a minimum without being abrupt",
    "Empathetic":   "understanding and supportive — acknowledge feelings or pressure the sender may be under before moving to practicalities",
}

REPLY_INSTRUCTIONS = (
    "Structure it with a natural greeting, a body that directly addresses the specific "
    "points and questions raised in the email (reference them concretely — no vague "
    "acknowledgements), and a clear sign-off. "
    "Keep it concise but complete: say what needs to be said, nothing more. "
    "Avoid filler phrases like 'I hope this email finds you well', 'please do not "
    "hesitate to reach out', 'as per my previous email', or 'going forward'. "
    "Write like a thoughtful human, not a template. "
    "Use \\n for line breaks between paragraphs."
)


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

    tone_guide = TONE_GUIDES.get(tone, TONE_GUIDES["Professional"])

    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=(
            "You are a business email analyst. Always respond with valid JSON only. "
            "No markdown, no extra text, just pure JSON."
        ),
        messages=[
            {
                "role": "user",
                "content": (
                    "Analyse this email and return a JSON object with these fields: "
                    "sender_mood, urgency (low/medium/high), summary, action_items (a list), "
                    "suggested_reply, recommended_response_time (one of: 'within 24 hours', "
                    "'within 48 hours', 'within a week', 'no response needed' — based on "
                    "urgency, deadlines mentioned, and tone).\n\n"
                    "For suggested_reply, write as if you are the recipient drafting a real response. "
                    f"Tone: {tone} — {tone_guide}. "
                    f"{REPLY_INSTRUCTIONS}\n\n"
                    f"Email:\n{email_text}"
                )
            }
        ]
    )

    raw = response.content[0].text
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    return jsonify(json.loads(cleaned))


@app.route('/regenerate-reply', methods=['POST'])
def regenerate_reply():
    data = request.get_json()
    email_text = (data or {}).get('email', '').strip()
    tone = (data or {}).get('tone', 'Professional').strip() or 'Professional'

    if not email_text:
        return jsonify({'error': 'No email provided'}), 400

    tone_guide = TONE_GUIDES.get(tone, TONE_GUIDES["Professional"])

    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system=(
            "You are a business email reply writer. Always respond with valid JSON only. "
            "No markdown, no extra text, just pure JSON."
        ),
        messages=[
            {
                "role": "user",
                "content": (
                    "Write a reply to the following email. "
                    "Return a JSON object with a single field: suggested_reply.\n\n"
                    "Write as if you are the recipient drafting a real response. "
                    f"Tone: {tone} — {tone_guide}. "
                    f"{REPLY_INSTRUCTIONS}\n\n"
                    f"Email:\n{email_text}"
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
