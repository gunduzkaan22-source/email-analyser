import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

conversation_history = []
system_prompt = "You are a helpful assistant. You must respond in plain text only. Absolutely no markdown formatting. No hashtags, no asterisks, no dashes for bullets, no headers, no bold text. Write everything as normal conversational paragraphs only. This is non-negotiable."
print("Chat with Claude! Type 'quit' to exit")
print("----------------------------------------")

while True:
    user_input = input("You: ")
    
    if user_input.lower() == "quit":
        break
    
    conversation_history.append({
        "role": "user",
        "content": user_input
    })
    
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=system_prompt,
        messages=conversation_history
    )
    
    assistant_message = response.content[0].text
    
    conversation_history.append({
        "role": "assistant", 
        "content": assistant_message
    })
    
    print(f"Claude: {assistant_message}")
    print()