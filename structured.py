import anthropic
import json
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=1024,
    system="You are a data extraction assistant. Always respond with valid JSON only. No extra text, no markdown, just pure JSON.",
    messages=[
        {
            "role": "user",
            "content": "Give me a profile of a fictional person. Include name, age, job, city and one hobby."
        }
    ]
)

raw_text = response.content[0].text

# Strip markdown wrapping if Claude added it
cleaned = raw_text.replace("```json", "").replace("```", "").strip()

parsed = json.loads(cleaned)

print("Raw response:", raw_text)
print()
print("Name:", parsed["name"])
print("Job:", parsed["job"])
print("City:", parsed["city"])