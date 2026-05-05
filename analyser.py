import anthropic
import json
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

print("Paste your email below, then press Enter twice when done:")
print("----------------------------------------------------------")

lines = []
while True:
    line = input()
    if line == "":
        break
    lines.append(line)

email_text = "\n".join(lines)

response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=1024,
    system="You are a business email analyst. Always respond with valid JSON only. No markdown, no extra text, just pure JSON.",
    messages=[
        {
            "role": "user",
            "content": f"Analyse this email and return a JSON object with these fields: sender_mood, urgency (low/medium/high), summary, action_items (a list), suggested_reply, recommended_response_time (one of: 'within 24 hours', 'within 48 hours', 'within a week', 'no response needed' — based on urgency, deadlines mentioned, and tone).\n\nEmail:\n{email_text}"
        }
    ]
)

raw_text = response.content[0].text
cleaned = raw_text.replace("```json", "").replace("```", "").strip()
parsed = json.loads(cleaned)

print()
print("📧 EMAIL ANALYSIS")
print("----------------------------------------------------------")
response_time = parsed['recommended_response_time']
needs_urgent = response_time == 'within 24 hours'
response_label = f"{response_time} ⚠️" if needs_urgent else response_time

print(f"Sender Mood:      {parsed['sender_mood']}")
print(f"Urgency:          {parsed['urgency']}")
print(f"Response Time:    {response_label}")
print(f"Summary:          {parsed['summary']}")
print()
print("✅ Action Items:")
for item in parsed['action_items']:
    print(f"  - {item}")
print()
print(f"💬 Suggested Reply:\n{parsed['suggested_reply']}")